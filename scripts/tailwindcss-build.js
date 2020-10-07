const glob = require('glob');
const { spawnSync } = require('child_process');

function printError(message) {
  console.error(`tailwindcss-build.js: ${message.split('\n').join('\n    ')}`);
}

function build(src, dst) {
  printError(`Building "${src}" into "${dst}".`);
  const build = spawnSync('yarn', ['tailwindcss', 'build', src, '-o', dst]);
  if (build.status !== 0) {
    printError(`Failed to build "${src}" into "${dst}".`);

    // FIXME - Show detailed build error message
    return false;
  }
  return true;
}

function buildAll(fileNames) {
  const indexPattern = /(?<=^|\/)tailwind\.css$/i;
  const normalPattern = /(?<=.+\.)tailwind\.css$/i;

  const failedFiles = [];
  for (const fileName of fileNames) {
    if (indexPattern.test(fileName)) {
      const singleBuildSuccess = build(fileName, fileName.replace(indexPattern, 'index.css'));
      if (!singleBuildSuccess) {
        failedFiles.push(fileName);
      }
    } else if (normalPattern.test(fileName)) {
      const singleBuildSuccess = build(fileName, fileName.replace(normalPattern, 'css'));
      if (!singleBuildSuccess) {
        failedFiles.push(fileName);
      }
    } else {
      printError(`Skipped "${fileName}".`);
    }
  }

  return failedFiles;
}

function tailwindcssBuild() {
  let fileNames;
  if (process.argv.length < 3) {
    fileNames = [
      ...glob.sync('src/**/tailwind.css'),
      ...glob.sync('src/**/*.tailwind.css'),
    ];
  } else {
    [ , , ...fileNames ] = process.argv;
  }

  const failedFiles = buildAll(fileNames);
  if (failedFiles.length > 0) {
    printError(`Failed to build the files below.\n${failedFiles.join('\n')}`);
    return 1;
  }

  printError('Build complete successfully!');
  return 0;
}

process.exitCode = tailwindcssBuild();
