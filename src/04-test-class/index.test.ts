// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(1000).getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(1000).withdraw(1100)).toThrow(
      new InsufficientFundsError(1000),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(1000).transfer(1100, getBankAccount(0)),
    ).toThrow(new InsufficientFundsError(1000));
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(100, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(1000).deposit(100).getBalance()).toEqual(1100);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(1000).withdraw(100).getBalance()).toEqual(900);
  });

  test('should transfer money', () => {
    const thisAccount = getBankAccount(1000);
    const otherAccount = getBankAccount(100);

    thisAccount.transfer(500, otherAccount);

    expect(thisAccount.getBalance()).toEqual(500);
    expect(otherAccount.getBalance()).toEqual(600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.mocked(random).mockReturnValueOnce(100);
    jest.mocked(random).mockReturnValueOnce(1);

    await expect(getBankAccount(1000).fetchBalance()).resolves.toEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.mocked(random).mockReturnValueOnce(100);
    jest.mocked(random).mockReturnValueOnce(1);

    const account = getBankAccount(1000);
    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.mocked(random).mockReturnValueOnce(100);
    jest.mocked(random).mockReturnValueOnce(0);

    await expect(() =>
      getBankAccount(1000).synchronizeBalance(),
    ).rejects.toThrow(new SynchronizationFailedError());
  });
});
