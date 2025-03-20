const {resolve} = require('../../dist/clean');

describe('resolve', () => {
  test('should resolve with a value', async () => {
    const promise = Promise.resolve();
    const value = 'test value';
    const resolvedValue = await promise.then(resolve(value));
    expect(resolvedValue).toBe(value);
  });

  test('should resolve with a promise-like object', async () => {
    const promise = Promise.resolve();
    const promiseLike = Promise.resolve('promise-like value');
    const resolvedValue = await promise.then(resolve(promiseLike));
    expect(resolvedValue).toBe('promise-like value');
  });

  test('should resolve with undefined', async () => {
    const promise = Promise.resolve();
    const resolvedValue = await promise.then(resolve());
    expect(resolvedValue).toBeUndefined(); // Expecting undefined when no value is passed
  });

  test('should resolve with a complex object', async () => {
    const promise = Promise.resolve();
    const complexValue = { key: 'value' };
    const resolvedValue = await promise.then(resolve(complexValue));
    expect(resolvedValue).toBe(complexValue); // Expecting the same complex object back
  });
});