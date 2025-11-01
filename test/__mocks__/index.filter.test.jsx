jest.mock('@beaverbuilder/cloud-ui', () => ({
  LibraryNav: ({ sections = [] }) => (
    <div data-testid="library-nav">
      {sections.map((s) => (
        <div key={s.key}>{s.label}</div>
      ))}
    </div>
  ),
  formatItem: (i) => i,
  formatSection: (s) => s,
}));