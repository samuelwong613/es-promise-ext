jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const { promiseWrap } = require('../dist/clean');

describe('promiseWrap', () => {
  test('should resolve with the result of the callback with no arguments', async () => {
    const asyncFunction = (callback) => {
      setTimeout(() => {
        callback();
      }, 100);
    };

    const promise = promiseWrap(asyncFunction);
    expect(promise instanceof Promise).toBe(true);
    jest.runOnlyPendingTimers();
    await expect(promise).resolves.toBeUndefined();
  });

  test('should resolve with the single argument returned from the callback', async () => {
    const asyncFunction = (callback) => {
      setTimeout(() => {
        callback(42);
      }, 100);
    };

    const promise = promiseWrap(asyncFunction);
    expect(promise instanceof Promise).toBe(true);
    jest.runOnlyPendingTimers();
    await expect(promise).resolves.toBe(42);
  });

  test('should resolve with multiple arguments returned from the callback', async () => {
    const asyncFunction = (callback) => {
      setTimeout(() => {
        callback(1, 'Hello', true);
      }, 100);
    };

    const promise = promiseWrap(asyncFunction);
    expect(promise instanceof Promise).toBe(true);
    jest.runOnlyPendingTimers();
    await expect(promise).resolves.toEqual([1, 'Hello', true]);
  });

  test('should handle if the async function do not use callback as 1st parameter', async () => {
    const asyncFunction = (a, b, callback) => {
      setTimeout(() => {
        callback(a, b, true);
      }, 100);
    };

    const promise = promiseWrap((cb) => asyncFunction(1,'Hello',cb));
    expect(promise instanceof Promise).toBe(true);
    jest.runOnlyPendingTimers();
    await expect(promise).resolves.toEqual([1, 'Hello', true]);
  });

  test('should throw TypeError if the first argument is not a function', () => {
    expect(() => promiseWrap(123)).toThrow(TypeError);
    expect(() => promiseWrap(null)).toThrow(TypeError);
    expect(() => promiseWrap({})).toThrow(TypeError);
    expect(() => promiseWrap('string')).toThrow(TypeError);
  });

  test('should resolve correctly when the callback is called immediately', async () => {
    const asyncFunction = (callback) => {
      callback(100, 'Immediate');
    };

    const promise = promiseWrap(asyncFunction);
    expect(promise instanceof Promise).toBe(true);
    jest.runOnlyPendingTimers();
    await expect(promise).resolves.toEqual([100, 'Immediate']);
  });

  test('should handle no arguments passed to the callback', async () => {
    const asyncFunction = (callback) => {
      callback();
    };

    const promise = promiseWrap(asyncFunction);
    expect(promise instanceof Promise).toBe(true);
    jest.runOnlyPendingTimers();
    await expect(promise).resolves.toBeUndefined();
  });
});