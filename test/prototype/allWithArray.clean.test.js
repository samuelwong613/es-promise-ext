const {all} = require('../../dist/clean');

describe('all', () => {
  test('should resolve with an array of results when all promises resolve', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve('2'),
      Promise.resolve(true)
    ];
    
    const results = await Promise.resolve().then(all(promises));
    expect(results).toEqual([1, '2', true]);
  });

  test('should handle mixed promises and values', async () => {
    const promises = [
      Promise.resolve(1),
      true,
      Promise.resolve('3')
    ];
    
    const results = await Promise.resolve().then(all(promises));
    expect(results).toEqual([1, true, '3']);
  });

  test('should resolve to an empty array when given an empty array', async () => {
    const results = await Promise.resolve().then(all([]));
    expect(results).toEqual([]);
  });

  test('should reject when any promise is rejected', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(new Error('Test Error')),
      Promise.resolve(3)
    ];
    
    await expect(Promise.resolve().then(all(promises))).rejects.toThrow('Test Error');
  });

  test('should work with a single promise', async () => {
    const promises = [
      Promise.resolve(42)
    ];
    
    const results = await Promise.resolve().then(all(promises));
    expect(results).toEqual([42]);
  });
});