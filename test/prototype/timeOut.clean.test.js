const {timeOut} = require('../../dist/clean');

describe('promise.timeOut', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks before each test
    jest.useFakeTimers(); // Use fake timers for controlling setTimeout
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run any pending timers
    jest.useRealTimers(); // Restore real timers
  });

  test('should resolve with the result of the async function within the time limit', async () => {
    const asyncFunction = jest.fn(() => Promise.resolve('Success'));
    const result = Promise.resolve().then(timeOut(asyncFunction, 1000));

    expect(result instanceof Promise).toBe(true);
    jest.runAllTimers(); // Fast-forward timers
    await expect(result).resolves.toBe('Success');
    expect(asyncFunction).toHaveBeenCalled();
  });

  test('should resolve with the result of the promise within the time limit', async () => {
    const promise = Promise.resolve('Success');
    const result = Promise.resolve().then(timeOut(promise, 1000));
    
    expect(result instanceof Promise).toBe(true);
    jest.runAllTimers(); // Fast-forward timers
    await expect(result).resolves.toBe('Success');
  });

  test('should reject with a timeout error if the async function takes too long', async () => {
    const asyncFunction = jest.fn(() => new Promise(() => {})); // Never resolves

    const result = Promise.resolve().then(timeOut(asyncFunction, 300));
    
    expect(result instanceof Promise).toBe(true);
    for(let i = 0; i < 100; i++) {
      jest.runOnlyPendingTimers();  // Fast-forward timers
      await Promise.resolve();
    }
    await expect(result).rejects.toThrow('Time Out Error: promise can not resolve in 300ms');
    expect(asyncFunction).toHaveBeenCalled();
  });

  test('should reject with a timeout error if the promise takes too long', async () => {
    const promise = new Promise(() => {}); // Never resolves

    const result = Promise.resolve().then(timeOut(promise, 300));
    
    expect(result instanceof Promise).toBe(true);
    for(let i = 0; i < 100; i++) {
      jest.runOnlyPendingTimers();  // Fast-forward timers
      await Promise.resolve();
    }
    await expect(result).rejects.toThrow('Time Out Error: promise can not resolve in 300ms');
  });

  test('should throw TypeError if the first argument is not a function or promise', () => {
    expect(() => Promise.resolve().then(timeOut(123)).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut('some string')).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut({})).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(true)).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(null)).toThrow(TypeError));
  });

  test('should throw TypeError if the second argument is not a positive integer', () => {
    expect(() => Promise.resolve().then(timeOut(() => Promise.resolve('test'), 'some string')).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(() => Promise.resolve('test'), {})).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(() => Promise.resolve('test'), true)).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(() => Promise.resolve('test'), null)).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(() => Promise.resolve('test'), -100)).toThrow(TypeError));
    expect(() => Promise.resolve().then(timeOut(() => Promise.resolve('test'), 1.5)).toThrow(TypeError));
  });

  test('should use default timeout of 1000 ms if not specified', async () => {
    const asyncFunction = jest.fn(() => Promise.resolve('Success'));
    const result = Promise.resolve().then(timeOut(asyncFunction));
    
    expect(result instanceof Promise).toBe(true);
    jest.runAllTimers(); // Fast-forward timers
    await expect(result).resolves.toBe('Success');
    expect(asyncFunction).toHaveBeenCalled();
  });
});