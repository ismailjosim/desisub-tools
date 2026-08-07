'use client';

import { useState, useCallback, useRef, DragEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import SrtParser from 'srt-parser-2';
import {
  Subtitles,
  Upload,
  Timer,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  FileText,
  ChevronDown,
  Info,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SrtLine {
  id: string;
  startTime: string;
  endTime: string;
  text: string;
}

interface FileMeta {
  name: string;
  lineCount: number;
  firstTimestamp: string;
  lastTimestamp: string;
  duration: string;
}

interface SyncedLine {
  index: number;
  id: string;
  timestamp: string;
  originalText: string;
  syncedText: string;
  isMismatch: boolean;
}

type FileSlot = 'A' | 'B';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseSrt(content: string): SrtLine[] {
  const parser = new SrtParser();
  return parser.fromSrt(content) as SrtLine[];
}

function parseVtt(content: string): SrtLine[] {
  // Strip WEBVTT header and notes, then convert timestamps to SRT-like format
  const lines = content
    .replace(/^WEBVTT.*\n?/m, '')
    .replace(/NOTE.*?(?=\n\n|\n\d)/gs, '')
    .trim();

  const blocks = lines.split(/\n\n+/).filter(Boolean);
  const result: SrtLine[] = [];

  for (const block of blocks) {
    const rows = block.split('\n').map((l) => l.trim());
    const timeRow = rows.find((r) => r.includes('-->'));
    if (!timeRow) continue;

    const [startRaw, endRaw] = timeRow.split('-->').map((s) => s.trim());
    const textRows = rows.filter((r) => r !== timeRow && !r.match(/^\d+$/));

    // Convert VTT timestamp (HH:MM:SS.mmm or MM:SS.mmm) to SRT (HH:MM:SS,mmm)
    const toSrt = (ts: string) => ts.replace('.', ',').padStart(12, '0:').slice(0, 12);

    result.push({
      id: String(result.length + 1),
      startTime: toSrt(startRaw),
      endTime: toSrt(endRaw),
      text: textRows.join(' '),
    });
  }
  return result;
}

function formatDuration(from: string, to: string): string {
  const parse = (ts: string) => {
    const [h, m, s] = ts.replace(',', '.').split(':').map(Number);
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  };
  const secs = Math.max(0, parse(to) - parse(from));
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
}

function generateSrt(lines: SyncedLine[]): string {
  return lines
    .map(
      (l, i) =>
        `${i + 1}\n${l.timestamp.replace(' --> ', ' --> ')}\n${l.syncedText || l.originalText}`
    )
    .join('\n\n');
}

function generateVtt(lines: SyncedLine[]): string {
  const body = lines
    .map((l) => {
      const ts = l.timestamp.replace(/,/g, '.');
      return `${ts}\n${l.syncedText || l.originalText}`;
    })
    .join('\n\n');
  return `WEBVTT\n\n${body}`;
}

function downloadBlob(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Drop Zone ────────────────────────────────────────────────────────────────
function DropZone({
  slot,
  label,
  sublabel,
  file,
  meta,
  error,
  onFile,
}: {
  slot: FileSlot;
  label: string;
  sublabel: string;
  file: File | null;
  meta: FileMeta | null;
  error: string | null;
  onFile: (f: File) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };

  const isA = slot === 'A';
  const accentClass = isA
    ? 'border-primary/40 bg-primary/5 ring-primary/30'
    : 'border-emerald-500/40 bg-emerald-500/5 ring-emerald-500/30';
  const iconColor = isA ? 'text-primary' : 'text-emerald-400';
  const badgeClass = isA ? 'bg-primary/15 text-primary' : 'bg-emerald-500/15 text-emerald-400';

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${badgeClass}`}
        >
          {slot}
        </span>
        <div>
          <p className="text-sm font-semibold text-white/90">{label}</p>
          <p className="text-xs text-white/40">{sublabel}</p>
        </div>
      </div>

      {/* Drop target */}
      <div
        id={`sync-dropzone-${slot.toLowerCase()}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3
          rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200
          ${
            dragging
              ? `scale-[1.02] ${accentClass} ring-2`
              : file
                ? 'border-white/10 bg-white/[0.03]'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".srt,.vtt"
          className="hidden"
          onChange={handleChange}
          id={`sync-file-input-${slot.toLowerCase()}`}
        />

        {file ? (
          <>
            <div className={`rounded-full bg-white/5 p-3 ring-1 ring-white/10`}>
              <FileText className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-white/80 truncate max-w-[200px]">
                {file.name}
              </p>
              {meta && (
                <p className="text-xs text-white/40 mt-1">
                  {meta.lineCount} lines · {meta.duration}
                </p>
              )}
            </div>
            <p className="text-xs text-white/30">Click to replace</p>
          </>
        ) : (
          <>
            <div className="rounded-full bg-white/5 p-3 ring-1 ring-white/10">
              <Upload className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">
                Drop your <span className={iconColor}>.srt</span> or{' '}
                <span className={iconColor}>.vtt</span> file
              </p>
              <p className="text-xs text-white/30 mt-1">or click to browse</p>
            </div>
          </>
        )}
      </div>

      {/* Metadata */}
      {meta && (
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs text-white/50 grid grid-cols-2 gap-2">
          <span>
            Lines: <span className="text-white/70 font-medium">{meta.lineCount}</span>
          </span>
          <span>
            Duration: <span className="text-white/70 font-medium">{meta.duration}</span>
          </span>
          <span className="col-span-2">
            First: <span className="font-mono text-white/60">{meta.firstTimestamp}</span>
          </span>
          <span className="col-span-2">
            Last: <span className="font-mono text-white/60">{meta.lastTimestamp}</span>
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <XCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SyncPage() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [metaA, setMetaA] = useState<FileMeta | null>(null);
  const [metaB, setMetaB] = useState<FileMeta | null>(null);
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);
  const [linesA, setLinesA] = useState<SrtLine[]>([]);
  const [linesB, setLinesB] = useState<SrtLine[]>([]);
  const [syncedLines, setSyncedLines] = useState<SyncedLine[]>([]);
  const [warning, setWarning] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showAllRows, setShowAllRows] = useState(false);

  // ─── File reader ─────────────────────────────────────────────────────────
  function readFile(
    file: File,
    slot: FileSlot,
    onDone: (lines: SrtLine[], meta: FileMeta) => void,
    onError: (msg: string) => void
  ) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext !== 'srt' && ext !== 'vtt') {
      onError(`Invalid format — only .srt and .vtt files are accepted.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text || !text.trim()) {
        onError('File is empty.');
        return;
      }
      try {
        const parsed = ext === 'srt' ? parseSrt(text) : parseVtt(text);
        if (!parsed.length) {
          onError('No subtitle lines found — file may be corrupted.');
          return;
        }
        const first = parsed[0];
        const last = parsed[parsed.length - 1];
        const meta: FileMeta = {
          name: file.name,
          lineCount: parsed.length,
          firstTimestamp: first.startTime,
          lastTimestamp: last.endTime,
          duration: formatDuration(first.startTime, last.endTime),
        };
        onDone(parsed, meta);
      } catch {
        onError('Failed to parse file — timestamps may be corrupted.');
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  const handleFileA = useCallback((f: File) => {
    setErrorA(null);
    setFileA(f);
    setMetaA(null);
    setLinesA([]);
    setSyncedLines([]);
    setWarning(null);
    readFile(
      f,
      'A',
      (lines, meta) => {
        setLinesA(lines);
        setMetaA(meta);
      },
      (msg) => {
        setErrorA(msg);
        setFileA(null);
      }
    );
  }, []);

  const handleFileB = useCallback((f: File) => {
    setErrorB(null);
    setFileB(f);
    setMetaB(null);
    setLinesB([]);
    setSyncedLines([]);
    setWarning(null);
    readFile(
      f,
      'B',
      (lines, meta) => {
        setLinesB(lines);
        setMetaB(meta);
      },
      (msg) => {
        setErrorB(msg);
        setFileB(null);
      }
    );
  }, []);

  // ─── Sync ─────────────────────────────────────────────────────────────────
  function runSync() {
    if (!linesA.length || !linesB.length) return;
    setWarning(null);

    const result: SyncedLine[] = linesA.map((a, i) => {
      const b = linesB[i];
      return {
        index: i + 1,
        id: a.id,
        timestamp: `${a.startTime} --> ${a.endTime}`,
        originalText: a.text,
        syncedText: b ? b.text : a.text,
        isMismatch: !b,
      };
    });

    if (linesB.length < linesA.length) {
      const diff = linesA.length - linesB.length;
      setWarning(
        `File B has ${diff} fewer line${diff > 1 ? 's' : ''} than File A — those lines keep File A's original text.`
      );
    } else if (linesB.length > linesA.length) {
      const diff = linesB.length - linesA.length;
      setWarning(`File B has ${diff} extra line${diff > 1 ? 's' : ''} — they were discarded.`);
    }

    setSyncedLines(result);
    setShowAllRows(false);
  }

  // ─── Download ─────────────────────────────────────────────────────────────
  function handleDownload(format: 'srt' | 'vtt') {
    if (!syncedLines.length) return;
    setDownloading(true);
    setTimeout(() => {
      const baseName = fileA?.name.replace(/\.(srt|vtt)$/i, '') || 'synced';
      const content = format === 'srt' ? generateSrt(syncedLines) : generateVtt(syncedLines);
      downloadBlob(content, `${baseName}_synced.${format}`);
      setDownloading(false);
    }, 100);
  }

  // ─── Derived ─────────────────────────────────────────────────────────────
  const canSync = linesA.length > 0 && linesB.length > 0;
  const hasSynced = syncedLines.length > 0;
  const mismatchCount = syncedLines.filter((l) => l.isMismatch).length;
  const previewRows = showAllRows ? syncedLines : syncedLines.slice(0, 20);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(240,20%,6%)]">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg,
            hsla(252,75%,52%,0.1) 25%,
            hsla(252,75%,52%,0.25) 50%,
            hsla(252,75%,52%,0.1) 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% -10%, hsla(152,60%,45%,0.07) 0%, transparent 70%)',
        }}
      />

      {/* ── Topbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[hsl(240,20%,6%)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link
            href="/dashboard"
            id="sync-back-btn"
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/80 transition-colors duration-150"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <span className="text-white/15">/</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 ring-1 ring-emerald-500/25">
              <Timer className="h-4 w-4 text-emerald-400" />
            </div>
            <h1 className="font-heading text-base font-semibold text-white/90">
              Subtitle Sync Fixer
            </h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        {/* Page header */}
        <div className="mb-10">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Fix Subtitle Sync
          </h2>
          <p className="mt-2 text-white/45 text-base max-w-2xl">
            Map the text from File B onto the timestamps of File A — entirely in your browser. No
            upload, no server.
          </p>
        </div>

        {/* ── Step 1: Upload ────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              1
            </span>
            <h3 className="font-heading text-lg font-semibold text-white/80">Upload Files</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <DropZone
              slot="A"
              label="File A — Timing Source"
              sublabel="Well-timed file (timestamps are correct)"
              file={fileA}
              meta={metaA}
              error={errorA}
              onFile={handleFileA}
            />
            <DropZone
              slot="B"
              label="File B — Text Source"
              sublabel="File with correct text but wrong timing"
              file={fileB}
              meta={metaB}
              error={errorB}
              onFile={handleFileB}
            />
          </div>

          {/* Info tip */}
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-white/35">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0 text-white/25" />
            <p>
              DesiSub will keep File A&apos;s timestamps and replace its text with File B&apos;s
              text, line by line. All processing happens locally — nothing is uploaded.
            </p>
          </div>
        </section>

        {/* ── Step 2: Sync ──────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              2
            </span>
            <h3 className="font-heading text-lg font-semibold text-white/80">Sync</h3>
          </div>

          <button
            id="sync-run-btn"
            onClick={runSync}
            disabled={!canSync}
            className={`
              flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white
              transition-all duration-200
              ${
                canSync
                  ? 'bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.02] shadow-lg shadow-emerald-900/40'
                  : 'cursor-not-allowed bg-white/5 text-white/25'
              }
            `}
          >
            <Subtitles className="h-5 w-5" />
            {hasSynced ? 'Re-sync Files' : 'Sync Files'}
          </button>

          {/* Warning banner */}
          {warning && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
              <p>{warning}</p>
            </div>
          )}

          {/* Success indicator */}
          {hasSynced && !warning && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <p>{syncedLines.length} lines synced successfully — no line count mismatch.</p>
            </div>
          )}
        </section>

        {/* ── Step 3: Preview ───────────────────────────────────────────────── */}
        {hasSynced && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  3
                </span>
                <h3 className="font-heading text-lg font-semibold text-white/80">Preview</h3>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/35">
                <span>{syncedLines.length} lines</span>
                {mismatchCount > 0 && (
                  <span className="text-amber-400">{mismatchCount} mismatched</span>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.02]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3 text-left font-semibold text-white/30 w-10">#</th>
                    <th className="px-4 py-3 text-left font-semibold text-white/30 w-52">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-white/30">
                      Original (A)
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-white/30">
                      Synced (B→A)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((line) => (
                    <tr
                      key={line.index}
                      className={`
                        border-b border-white/[0.03] transition-colors duration-100
                        ${line.isMismatch ? 'bg-amber-500/5' : 'hover:bg-white/[0.02]'}
                      `}
                    >
                      <td className="px-4 py-3 font-mono text-white/25">{line.index}</td>
                      <td className="px-4 py-3 font-mono text-white/45 whitespace-nowrap">
                        {line.timestamp.split(' --> ')[0]}
                        <br />
                        <span className="text-white/25">→ {line.timestamp.split(' --> ')[1]}</span>
                      </td>
                      <td className="px-4 py-3 text-white/50 max-w-xs">{line.originalText}</td>
                      <td
                        className={`px-4 py-3 max-w-xs ${
                          line.isMismatch ? 'text-amber-400/70 italic' : 'text-white/80'
                        }`}
                      >
                        {line.isMismatch ? (
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            kept original
                          </span>
                        ) : (
                          line.syncedText
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Show more */}
              {syncedLines.length > 20 && !showAllRows && (
                <button
                  id="sync-show-all-btn"
                  onClick={() => setShowAllRows(true)}
                  className="flex w-full items-center justify-center gap-2 border-t border-white/5 py-3 text-xs text-white/35 transition-colors hover:bg-white/[0.02] hover:text-white/60"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  Show all {syncedLines.length} lines
                </button>
              )}
            </div>
          </section>
        )}

        {/* ── Step 4: Download ──────────────────────────────────────────────── */}
        {hasSynced && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                4
              </span>
              <h3 className="font-heading text-lg font-semibold text-white/80">Download</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                id="sync-download-srt-btn"
                onClick={() => handleDownload('srt')}
                disabled={downloading}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-150 hover:bg-primary/90 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Download .srt
              </button>
              <button
                id="sync-download-vtt-btn"
                onClick={() => handleDownload('vtt')}
                disabled={downloading}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/75 backdrop-blur-sm transition-all duration-150 hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Download .vtt
              </button>
            </div>

            <p className="mt-3 text-xs text-white/30">
              The downloaded file will have File A&apos;s timestamps and File B&apos;s text.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
