const {promiseAllWith} = require('../dist/clean');

describe('Promise.allWith array', () => {
  test('should resolve with an array of results when all promises resolve', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve('test'),
      Promise.resolve(true),
    ];

    const results = await promiseAllWith(promises);
    expect(results).toEqual([1, 'test', true]);
  });

  test('should handle mixed promises and direct values', async () => {
    const promises = [
      Promise.resolve(1),
      'static value',
      Promise.resolve(false),
    ];

    const results = await promiseAllWith(promises);
    expect(results).toEqual([1, 'static value', false]);
  });

  test('should reject when any promise is rejected', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject('Error'),
      Promise.resolve(true),
    ];

    await expect(promiseAllWith(promises)).rejects.toBe('Error');
  });

  test('should work with an array of a single promise', async () => {
    const promises = [Promise.resolve(42)];

    const results = await promiseAllWith(promises);
    expect(results).toEqual([42]);
  });

  test('should handle empty array', async () => {
    const results = await promiseAllWith([]);
    expect(results).toEqual([]);
  });

  test('should ignore non-promise values in a mixed array', async () => {
    const promises = [
      Promise.resolve(1),
      2,
      Promise.resolve(3),
    ];

    const results = await promiseAllWith(promises);
    expect(results).toEqual([1, 2, 3]);
  });

  test('should handle an iterable', async () => {
    const promises = new Set([
      Promise.resolve(1),
      Promise.resolve('test'),
      Promise.resolve(true),
    ]);

    const results = await promiseAllWith(promises);
    expect(results).toEqual([1, 'test', true]);
  });

  test('should reject if any promise in an iterable is rejected', async () => {
    const promises = new Set([
      Promise.resolve(1),
      Promise.reject('Error'),
      Promise.resolve(true),
    ]);

    await expect(promiseAllWith(promises)).rejects.toBe('Error');
  });

  test('should handle promises that resolve to other promises', async () => {
    const promises = [
      Promise.resolve(Promise.resolve(1)),
      Promise.resolve(2),
      Promise.resolve(Promise.resolve(3)),
    ];

    const results = await promiseAllWith(promises);
    expect(results).toEqual([1, 2, 3]);
  });

  test('should throw TypeError if input is not an array or iterable', () => {
    expect(() => promiseAllWith(null)).toThrow(TypeError);
    expect(() => promiseAllWith(true)).toThrow(TypeError);
    expect(() => promiseAllWith('some string')).toThrow(TypeError);
    expect(() => promiseAllWith(123)).toThrow(TypeError);
  });
});