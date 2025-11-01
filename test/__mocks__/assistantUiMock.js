import React from 'react';

export const Page = ({ children }) => <div>{children}</div>;

export const Icon = {
  Library: () => <i data-testid="icon-library" />,
  Shared: () => <i data-testid="icon-shared" />,
  Swirl: () => <i data-testid="icon-swirl" />,
};

export const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
export const Menu = ({ children }) => <div>{children}</div>;