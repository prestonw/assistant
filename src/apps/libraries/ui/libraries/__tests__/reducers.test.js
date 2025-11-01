import { appOrder } from 'system/data/system/reducers';

test('REGISTER_APP appends unique key', () => {
  const state = [];
  const next = appOrder(state, { type: 'REGISTER_APP', key: 'fl-home' });
  expect(next).toEqual(['fl-home']);
  expect(state).toEqual([]); // immutability
});

test('SET_APP_POSITION moves key to target index', () => {
  const state = ['a', 'b', 'c'];
  const next = appOrder(state, { type: 'SET_APP_POSITION', key: 'a', position: 2 });
  expect(next).toEqual(['b', 'c', 'a']);
});

test('REGISTER_APP ignored when config.enabled === false', () => {
  const state = ['a'];
  const next = appOrder(state, { type: 'REGISTER_APP', key: 'x', config: { enabled: false } });
  expect(next).toEqual(['a']);
});