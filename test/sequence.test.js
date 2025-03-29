jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
require('../dist/sequence');

describe('Promise.sequence', () => {
  test('should resolve with the results of async functions', async () => {
    const result = Promise.sequence([
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ]);
    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual([1, 2, 3]);
  });

  test('should resolve with mixed values (promises and static values)', async () => {
    const result = Promise.sequence([
      () => Promise.resolve('string'),
      42,
      () => Promise.resolve(true),
    ]);
    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual(['string', 42, true]);
  });

  test('should handle errors and skip them if skipIfError is true', async () => {
    const result = Promise.sequence([
      () => Promise.resolve(1),
      () => Promise.reject(new Error('Error!')),
      () => Promise.resolve(3),
    ], { skipIfError: true });
    
    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual([1, new Error('Error!'), 3]);
  });

  test('should throw an error if any promise is rejected and skipIfError is false', async () => {
    await expect(Promise.sequence([
      () => Promise.resolve(1),
      () => Promise.reject(new Error('Error!')),
      () => Promise.resolve(3),
    ], { skipIfError: false })).rejects.toThrow('Error!');
  });

  test('should correctly handle cancellation', async () => {
    const canceller = { cancelled: false };

    const result = Promise.sequence([
      () => Promise.resolve(1),
      () => {
        canceller.cancelled = true; // Simulate cancellation
        return Promise.resolve(2);
      },
      () => Promise.resolve(3),
    ], { canceller });

    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual([1, 2, canceller]);
  });

  test('should call the progress function correctly', async () => {
    const progress = jest.fn();
    const result = Promise.sequence([
      async () => 1,
      async () => 2,
      async () => 3,
    ], {
      progress,
    });

    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual([1, 2, 3]);
    expect(progress).toHaveBeenCalledTimes(3);
    expect(progress).toHaveBeenNthCalledWith(1, 1, 0, 3);
    expect(progress).toHaveBeenNthCalledWith(2, 2, 1, 3);
    expect(progress).toHaveBeenNthCalledWith(3, 3, 2, 3);
  });

  test('should handle an empty array', async () => {
    const result = Promise.sequence([], { skipIfError: false });
    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual([]);
  });

  test('should handle static values and skip errors with progress', async () => {
    const progress = jest.fn();
    const result = Promise.sequence([
      1,
      () => Promise.reject(new Error('Error!')),
      3,
    ], {
      skipIfError: true,
      progress,
    });

    expect(result instanceof Promise).toBe(true);
    expect(await result).toEqual([1, new Error('Error!'), 3]);
    expect(progress).toHaveBeenCalled();
  });

  test('should call async functions sequentially', async () => {
    const order = [];
    const asyncFunctions = [
      async () => {
        order.push(1);
        const promise = new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async work
        jest.runOnlyPendingTimers();
        await promise;
      },
      async () => {
        order.push(2);
        const promise = new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
        jest.runOnlyPendingTimers();
        await promise;
      },
      async () => {
        order.push(3);
      },
    ];
  
    const result = Promise.sequence(asyncFunctions);
  
    expect(result instanceof Promise).toBe(true);
    await result;
    expect(order).toEqual([1, 2, 3]);
  });
});