const {allSettled} = require('../../dist/clean');

describe('allSettled', () => {
  test('should resolve with an array of results when all promises settle', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];
    
    const results = await Promise.resolve().then(allSettled(promises));
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  test('should handle mixed promises (fulfilled and rejected)', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(2),
      Promise.resolve(3)
    ];
    
    const results = await Promise.resolve().then(allSettled(promises));
    expect(results).toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 2 },
      { status: 'fulfilled', value: 3 }
    ]);
  });

  test('should resolve to an empty array when given an empty array', async () => {
    const results = await Promise.resolve().then(allSettled([]));
    expect(results).toEqual([]);
  });

  test('should handle all promises rejected', async () => {
    const promises = [
      Promise.reject(new Error('Error 1')),
      Promise.reject(new Error('Error 2')),
    ];
    
    const results = await Promise.resolve().then(allSettled(promises));
    expect(results).toEqual([
      { status: 'rejected', reason: new Error('Error 1') },
      { status: 'rejected', reason: new Error('Error 2') },
    ]);
  });

  test('should work with a single promise', async () => {
    const promises = [
      Promise.resolve(42)
    ];
    
    const results = await Promise.resolve().then(allSettled(promises));
    expect(results).toEqual([
      { status: 'fulfilled', value: 42 }
    ]);
  });
});