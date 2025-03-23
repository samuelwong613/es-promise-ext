const {allObject} = require('../../dist/clean');

describe('allObject', () => {
  test('should resolve with an object of results when all promises resolve', async () => {
    const promises = {
      someNumber: Promise.resolve(1),
      someString: Promise.resolve('test'),
      someBoolean: Promise.resolve(true),
    };

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({
      someNumber: 1,
      someString: 'test',
      someBoolean: true,
    });
  });

  test('should handle mixed promises and direct values', async () => {
    const promises = {
      someNumber: Promise.resolve(1),
      someString: 'test',
      someBoolean: Promise.resolve(true),
    };

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({
      someNumber: 1,
      someString: 'test',
      someBoolean: true,
    });
  });

  test('should reject when any promise is rejected', async () => {
    const promises = {
      someNumber: Promise.resolve(1),
      someString: Promise.reject('Test Error'),
      someBoolean: Promise.resolve(true),
    };

    await expect(Promise.resolve().then(allObject(promises))).rejects.toBe('Test Error');
  });

  test('should resolve to an object with the same keys for a single promise', async () => {
    const promises = {
      someNumber: Promise.resolve(42),
    };

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({
      someNumber: 42,
    });
  });

  test('should return an empty object when given an empty object', async () => {
    const promises = {};

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({});
  });

  // New tests with non-string keys
  test('should handle number keys', async () => {
    const promises = {
      1: Promise.resolve(100),
      2: Promise.resolve(200),
    };

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({
      1: 100,
      2: 200,
    });
  });

  test('should handle symbol keys', async () => {
    const sym1 = Symbol('symbol1');
    const sym2 = Symbol('symbol2');

    const promises = {
      [sym1]: Promise.resolve('foo'),
      [sym2]: Promise.resolve('bar'),
    };

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({
      [sym1]: 'foo',
      [sym2]: 'bar',
    });
  });

  test('should work with mixed keys (string, number, and symbol)', async () => {
    const sym = Symbol('mixed');

    const promises = {
      stringKey: Promise.resolve('string'),
      123: Promise.resolve(123),
      [sym]: Promise.resolve('symbol'),
    };

    const results = await Promise.resolve().then(allObject(promises));
    expect(results).toEqual({
      stringKey: 'string',
      123: 123,
      [sym]: 'symbol',
    });
  });
});