// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Add })).toBe(-3);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Add })).toBe(-1);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 1, b: -2, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Multiply })).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: 3, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: -4, b: 2, action: Action.Divide })).toBe(-2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(simpleCalculator({ a: 4, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'Hello' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: {}, b: 3, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 2, b: 'Test', action: Action.Add }),
    ).toBeNull();
  });
});
