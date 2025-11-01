// Minimal mock that avoids internal store registration
const LibraryNav = ({ sections = [] }) => (
  <div data-testid="library-nav">
    {sections.map((s) => (
      <div key={s.key}>{s.label}</div>
    ))}
  </div>
);

const formatItem = (i) => i;
const formatSection = (s) => s;

module.exports = { LibraryNav, formatItem, formatSection };
