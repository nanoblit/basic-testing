// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases: [
  a: unknown,
  b: unknown,
  action: unknown,
  expected: number | null,
][] = [
  [1, 2, Action.Add, 3],
  [-1, -2, Action.Add, -3],
  [1, -2, Action.Add, -1],
  [1, 2, Action.Subtract, -1],
  [-1, -2, Action.Subtract, 1],
  [1, -2, Action.Subtract, 3],
  [2, 2, Action.Multiply, 4],
  [0, 2, Action.Multiply, 0],
  [-1, -2, Action.Multiply, 2],
  [3, 3, Action.Divide, 1],
  [3, 0, Action.Divide, Infinity],
  [-4, 2, Action.Divide, -2],
  [2, 3, Action.Exponentiate, 8],
  [3, 2, Action.Exponentiate, 9],
  [4, 0, Action.Exponentiate, 1],
  [2, 3, 'Hello', null],
  [{}, 3, Action.Add, null],
  [2, 'Test', Action.Add, null],
];

describe.each(testCases)('simpleCalculator', (a, b, action, expectedOutput) => {
  test(`should return ${expectedOutput} for a: ${a}, b: ${b}, action: ${action}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expectedOutput);
  });
});
