import '@testing-library/jest-dom';
// Silence React warnings triggered by intentionally shallow mocks in tests
jest.spyOn(console, 'error').mockImplementation((msg, ...args) => {
    if (
      typeof msg === 'string' &&
      msg.includes('Warning: React.createElement: type is invalid')
    ) {
      return;
    }
    // forward anything else so you still see real problems
    // eslint-disable-next-line no-console
    console.warn(msg, ...args);
  });
  