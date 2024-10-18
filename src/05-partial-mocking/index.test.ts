// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

console.log = jest.fn();

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(jest.mocked(console.log).mock.calls).toHaveLength(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(jest.mocked(console.log).mock.calls).toHaveLength(1);
  });
});
