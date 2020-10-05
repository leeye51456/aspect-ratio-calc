const glob = require('glob');
const { spawnSync } = require('child_process');

function tailwindcssBuild() {
  const fileNames = glob.sync('src/**/!(*tailwind).css');

  for (let i = 0; i < fileNames.length; i += 1) {
    console.error(`tailwindcss-clean.js: Removing "${fileNames[i]}".`);
    const removal = spawnSync('rm', [fileNames[i]]);
    if (removal.status !== 0) {
      console.error(`tailwindcss-clean.js: Failed to remove "${fileNames[i]}".`);
    }
  }

  console.error('tailwindcss-clean.js: Removal complete.');
  return 0;
}

process.exitCode = tailwindcssBuild();
