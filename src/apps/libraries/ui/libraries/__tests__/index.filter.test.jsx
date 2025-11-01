import React from 'react';
import { render, screen } from '@testing-library/react';
import Libraries from '../index';

jest.mock('assistant/data', () => ({
  useSystemState: () => ({ cloudUser: { name: 'Will', avatar: null, gravatar: { md: 'x' } } }),
  useAppState: () => ({
    filter: { owner: 'all', search: 'buttons' },
    libraries: {
      user: [{ id: 1, label: 'Buttons UI' }, { id: 2, label: 'Cards' }],
      shared: [{ id: 3, label: 'Buttons Pro' }],
      team: {},
      access: [],
    },
    teams: [],
  }),
}));

jest.mock('@beaverbuilder/cloud-ui', () => {
  const actual = jest.requireActual('@beaverbuilder/cloud-ui');
  return {
    ...actual,
    LibraryNav: ({ sections }) => (
      <div data-testid="libnav">
        {sections.flatMap(s => s.items).map(i => i.label || i.name).join(',')}
      </div>
    ),
    formatItem: (i) => ({ ...i, name: i.label || i.name }),
    formatSection: (s) => s,
  };
});

jest.mock('assistant/ui', () => ({
  Page: ({ children }) => <div>{children}</div>,
  Icon: { Library: () => <i /> },
}));

jest.mock('../filter', () => () => <div data-testid="filter" />);
jest.mock('../list', () => () => null);

test('filters LibraryNav items by filter.search (case-insensitive)', () => {
  render(<Libraries />);
  const nav = screen.getByTestId('libnav');
  expect(nav.textContent).toContain('Buttons UI');
  expect(nav.textContent).toContain('Buttons Pro');
  expect(nav.textContent).not.toContain('Cards');
});