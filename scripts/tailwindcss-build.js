const glob = require('glob');
const { spawnSync } = require('child_process');

function printError(message) {
  console.error(`tailwindcss-build.js: ${message}`);
}

function build(src, dst) {
  printError(`Building "${src}" into "${dst}".`);
  const build = spawnSync('yarn', ['tailwindcss', 'build', src, '-o', dst]);
  if (build.status !== 0) {
    printError(`Failed to build "${src}" into "${dst}".`);
    return false;
  }
  return true;
}

function tryBuild(fileNames) {
  const indexPattern = /(?<=^|\/)tailwind\.css$/i;
  const normalPattern = /(?<=.+\.)tailwind\.css$/i;

  let failed = false;
  for (const fileName of fileNames) {
    if (indexPattern.test(fileName)) {
      const buildResult = build(fileName, fileName.replace(indexPattern, 'index.css'));
      failed = failed || !buildResult;
    } else if (normalPattern.test(fileName)) {
      const buildResult = build(fileName, fileName.replace(normalPattern, 'css'));
      failed = failed || !buildResult;
    } else {
      printError(`Skipped "${fileName}".`);
    }
  }

  return !failed;
}

function tailwindcssBuild() {
  if (process.argv.length >= 3) {
    const [ , , ...fileNames ] = process.argv;
    const buildSuccess = tryBuild(fileNames);
    return buildSuccess ? 0 : 1;
  }

  const fileNames = [
    ...glob.sync('src/**/tailwind.css'),
    ...glob.sync('src/**/*.tailwind.css'),
  ];
  const buildResult = tryBuild(fileNames);
  if (buildResult !== 0) {
    printError('Build failed!');
  }

  printError('Build complete successfully!');
  return 0;
}

process.exitCode = tailwindcssBuild();
