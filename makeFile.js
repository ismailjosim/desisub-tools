const fs = require("fs");
const path = require("path");

const files = [
  "src/components/Home/index.ts",
  "src/components/Home/HeroSection.tsx",
  "src/components/Home/StatsSection.tsx",
  "src/components/Home/FeaturesSection.tsx",
  "src/components/Home/HowItWorksSection.tsx",
  "src/components/Home/CTASection.tsx",
  "src/components/Home/FeatureCard.tsx",
  "src/components/Home/StatCard.tsx",
  "src/components/Home/FloatingOrb.tsx",
  "src/components/Home/Counter.tsx",
  "src/components/Home/styles.ts",
];

function getComponentName(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));

  return fileName;
}

function getFileContent(filePath) {
  const ext = path.extname(filePath);
  const componentName = getComponentName(filePath);

  // TSX component template
  if (ext === ".tsx") {
    return `"use client";

const ${componentName} = () => {
  return (
    <p>${componentName}</p>
  );
};

export default ${componentName};
`;
  }

  // index.ts template
  if (path.basename(filePath) === "index.ts") {
    return "";
  }

  return "";
}

function createFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  const directory = path.dirname(fullPath);

  // Create folders
  fs.mkdirSync(directory, { recursive: true });

  // Create file
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(
      fullPath,
      getFileContent(filePath),
      "utf8"
    );

    console.log(`✅ Created: ${filePath}`);
  } else {
    console.log(`⚠️ Exists: ${filePath}`);
  }
}

files.forEach(createFile);

console.log("\n🎉 Home component structure created successfully!");