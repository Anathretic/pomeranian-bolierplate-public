import { sum } from './sum';

beforeEach(() => {
  console.log("I'm Before Each");
});

afterEach(() => {
  console.log('Cleanup After');
});

test('adds 1 + 2 to equal 3', () => {
  const data = { one: 1, two: 2 };
  expect(sum(1, 2)).toBe(3);
  expect(data).toEqual({ one: 1, two: 2 });
});
