test('moduleNameMapper mappings resolve', () => {
    expect(() => require('@beaverbuilder/cloud-ui')).not.toThrow();
    expect(() => require('assistant/data')).not.toThrow();
  });  