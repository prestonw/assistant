jest.mock('@beaverbuilder/cloud-ui');
const noop = () => {};
const pNoop = async () => ({});

const cloud = {
  api: {
    get: pNoop,
    post: pNoop,
    put: pNoop,
    delete: pNoop,
  },
  auth: {
    isAuthenticated: () => false,
    getToken: () => null,
  },
  config: {},
  ui: {},
  on: noop,
  off: noop,
  emit: noop,
};

export default cloud;