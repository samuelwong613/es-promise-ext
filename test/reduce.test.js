require('../dist/reduce'); // Adjust the import path as necessary

describe('reduce', () => {
  test('should resolve with the final result of async functions', async () => {
    const init = () => Promise.resolve(1);
    const add = (value) => Promise.resolve(value + 1);
    const multiply = (value) => Promise.resolve(value * 2);

    const result = Promise.reduce([init, add, multiply]);
    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(4); // (1 + 1) * 2 = 4
  });

  test('should resolve with the final result of async functions with initValue', async () => {
    const add = (value) => Promise.resolve(value + 1);
    const multiply = (value) => Promise.resolve(value * 2);

    const result = Promise.reduce([add, multiply], { initValue: 1 });
    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(4); // (1 + 1) * 2 = 4
  });

  test('should resolve with the final result of functions', async () => {
    const add = (value) => value + 1;
    const multiply = (value) => value * 2;

    const result = Promise.reduce([add, multiply], { initValue: 1 });
    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(4); // (1 + 1) * 2 = 4
  });

  test('should resolve with the final result of mixed functions ans async functions', async () => {
    const add = (value) => value + 1;
    const multiply = (value) => Promise.resolve(value * 2);
    const toString = (value) => value.toString();

    const result = Promise.reduce([add, multiply, add, multiply, toString], { initValue: 1 });
    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe('10'); // (((1 + 1) * 2) + 1) * 2 = 10
  });

  test('should handle static values and return the final result', async () => {
    const staticValue = 10;
    const addFive = (value) => Promise.resolve(value + 5);

    const result = Promise.reduce([addFive], { initValue: staticValue });
    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(15); // 10 + 5 = 15
  });

  test('should handle errors and reject if any promise is rejected', async () => {
    const add = (value) => Promise.resolve(value + 1);
    const errorFunction = () => Promise.reject(new Error('Error!'));

    await expect(Promise.reduce([add, errorFunction, add], { initValue: 1 })).rejects.toThrow('Error!');
  });

  test('should handle errors and reject if any promise is rejected', async () => {
    const add = (value) => Promise.resolve(value + 1);
    const errorFunction = () => { throw new Error('Error!') };

    await expect(Promise.reduce([add, errorFunction, add], { initValue: 1 })).rejects.toThrow('Error!');
  });

  test('should handle errors and reject if any promise is rejected', async () => {
    const add = (value) => value + 1;
    const multiply = (value) => Promise.resolve(value * 2);
    const stringSplit = (value) => value.split();

    await expect(Promise.reduce([add, stringSplit, multiply], { initValue: 1 })).rejects.toThrow('value.split is not a function');
  });

  test('should handle errors and reject it is not function array', async () => {
    await expect(Promise.reduce(42)).rejects.toThrow('Promise.reduce must be called with an async function array');
    await expect(Promise.reduce('some string')).rejects.toThrow('Promise.reduce must be called with an async function array');
    await expect(Promise.reduce(true)).rejects.toThrow('Promise.reduce must be called with an async function array');
    await expect(Promise.reduce(null)).rejects.toThrow('Promise.reduce must be called with an async function array');
    await expect(Promise.reduce()).rejects.toThrow('Promise.reduce must be called with an async function array');
  });

  test('should handle errors and reject it is not function array', async () => {
    const add = (value) => value + 1;
    const multiply = (value) => Promise.resolve(value * 2);

    await expect(Promise.reduce([add, true, multiply], { initValue: 1 })).rejects.toThrow('Promise.reduce must be called with an async function array');
  });

  test('should skip functions if canceller is set to true', async () => {
    const canceller = { cancelled: false };
    const add = (value) => {
      canceller.cancelled = true; // Simulate cancellation
      return Promise.resolve(value + 1)
    };
    const multiply = (value) => Promise.resolve(value * 2);

    const result = Promise.reduce([add, multiply], { initValue: 1, canceller });

    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(2); // Only the first function should be applied
  });

  test('should call the progress function correctly', async () => {
    const progress = jest.fn();
    const add = (value) => Promise.resolve(value + 1);

    await Promise.reduce([add, add], { initValue: 1, progress });

    expect(progress).toHaveBeenCalledTimes(2);
    expect(progress).toHaveBeenNthCalledWith(1, 2, 0, 2); // After first function
    expect(progress).toHaveBeenNthCalledWith(2, 3, 1, 2); // After second function
  });

  test('should handle an empty array', async () => {
    const result = Promise.reduce([], { initValue: 1 });
    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(1); // Should return the initial value
  });

  test('should correctly handle progress with cancellation', async () => {
    const progress = jest.fn();
    const canceller = { cancelled: false };
    const add = (value) => Promise.resolve(value + 1);

    const result = Promise.reduce([add, add], { initValue: 1, canceller, progress });
    canceller.cancelled = true; // Simulate cancellation

    expect(result instanceof Promise).toBe(true);
    expect(await result).toBe(2); // Only the first function should be applied
    expect(progress).toHaveBeenCalled();
  });
});