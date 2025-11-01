import React from 'react';
import { render } from '@testing-library/react';
import Libraries from '../index';

jest.mock('assistant/data', () => ({
  useSystemState: () => ({ cloudUser: { name: 'Will', avatar: null, gravatar: { md: 'x' } } }),
  useAppState: () => ({
    filter: { owner: 'all', search: '' },
    libraries: { user: [], shared: [], team: {}, access: [] },
    teams: [],
  }),
}));
jest.mock('@beaverbuilder/cloud-ui', () => ({
  LibraryNav: () => <div />,
  formatItem: (i) => i,
  formatSection: (s) => s,
}));
jest.mock('assistant/ui', () => ({
  Page: ({ children }) => <div>{children}</div>,
  Icon: { Library: () => <i /> },
}));
jest.mock('../filter', () => () => null);
jest.mock('../list', () => () => null);

test('renders without crashing', () => {
  render(<Libraries />);
});