module.exports = {
  printWidth: 130,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cx', 'twMerge'],
};
