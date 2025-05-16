import path from 'path';

const buildEslintCommand = filenames =>
  `eslint --fix --max-warnings=0 ${filenames.map(f => path.relative(process.cwd(), f)).join(' ')}`;

const buildPrettierCommand = filenames =>
  `prettier --write ${filenames.map(f => path.relative(process.cwd(), f)).join(' ')}`;

const config = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{js,jsx,ts,tsx,json,css,md}': [buildPrettierCommand],
  '*.{ts,tsx}': ["bash -c 'tsc --noEmit'"],
};

export default config;
