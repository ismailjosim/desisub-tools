import Counter from './Counter';

const stats = [
  {
    value: 50000,
    suffix: '+',
    label: 'Subtitles Translated',
  },
  {
    value: 12,
    suffix: '+',
    label: 'Languages Supported',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Sync Accuracy',
  },
  {
    value: 5000,
    suffix: '+',
    label: 'Happy Users',
  },
];

export default function StatsSection() {
  return (
    <section id="stats">
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter end={stat.value} suffix={stat.suffix} />

            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
