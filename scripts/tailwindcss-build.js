const glob = require('glob');
const { spawnSync } = require('child_process');

function buildIndex() {
  const fileNames = glob.sync('src/tailwind.css');
  if (fileNames.length === 0) {
    return false;
  }

  console.error(`tailwindcss-build.js: Building "${fileNames[0]}" into "src/index.css".`);
  const build = spawnSync('yarn', ['tailwindcss', 'build', fileNames[0], '-o', 'src/index.css']);
  if (build.status !== 0) {
    console.error(`tailwindcss-build.js: Failed to build "${fileNames[0]}" into "src/index.css".`);
    return false;
  }

  return true;
}

function buildOthers() {
  const fileNames = glob.sync('src/**/*.tailwind.css');
  const outputNames = fileNames.map((fileName) => fileName.replace(/\.tailwind\.css$/i, '.css'));

  for (let i = 0; i < fileNames.length; i += 1) {
    console.error(`tailwindcss-build.js: Building "${fileNames[i]}" into "${outputNames[i]}".`);
    const build = spawnSync('yarn', ['tailwindcss', 'build', fileNames[i], '-o', outputNames[i]]);
    if (build.status !== 0) {
      console.error(`tailwindcss-build.js: Failed to build "${fileNames[i]}" into "${outputNames[i]}".`);
      return false;
    }
  }

  return true;
}

function tailwindcssBuild() {
  const buildIndexSuccess = buildIndex();
  if (!buildIndexSuccess) {
    return 1;
  }

  const buildOthersSuccess = buildOthers();
  if (!buildOthersSuccess) {
    return 1;
  }

  console.error('tailwindcss-build.js: Build complete.');
  return 0;
}

process.exitCode = tailwindcssBuild();
