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

  test('should handle an iterable', async () => {
    const promises = new Set([
      Promise.resolve(1),
      Promise.resolve('test'),
      Promise.resolve(true),
    ]);

    const results = await Promise.resolve().then(all(promises));
    expect(results).toEqual([1, 'test', true]);
  });

  test('should reject if any promise in an iterable is rejected', async () => {
    const promises = new Set([
      Promise.resolve(1),
      Promise.reject('Error'),
      Promise.resolve(true),
    ]);

    await expect(Promise.resolve().then(all(promises))).rejects.toBe('Error');
  });
  
  test('should handle promises that resolve to other promises', async () => {
    const promises = [
      Promise.resolve(Promise.resolve(1)),
      Promise.resolve(2),
      Promise.resolve(Promise.resolve(3)),
    ];

    const results = await Promise.resolve().then(all(promises));
    expect(results).toEqual([1, 2, 3]);
  });

  test('should throw TypeError if input is not an array or iterable', () => {
    expect(() => Promise.resolve().then(all(null))).toThrow(TypeError);
    expect(() => Promise.resolve().then(all(true))).toThrow(TypeError);
    expect(() => Promise.resolve().then(all('some string'))).toThrow(TypeError);
    expect(() => Promise.resolve().then(all(123))).toThrow(TypeError);
  });
});