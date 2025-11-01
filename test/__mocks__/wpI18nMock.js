// Minimal mock for @wordpress/i18n used in tests
export const __ = (s, domain) => (typeof s === 'string' ? s : String(s));
export const _x = (s) => (typeof s === 'string' ? s : String(s));
export const _n = (single, plural, n) => (n === 1 ? single : plural);
export const _nx = (single, plural, n) => (n === 1 ? single : plural);
export const sprintf = (fmt, ...args) => {
  // very naive passthrough; good enough for tests that don’t assert formatting
  if (!args.length) return fmt;
  return [fmt, ...args].join(' ');
};
export default { __, _x, _n, _nx, sprintf };