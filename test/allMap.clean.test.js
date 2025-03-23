const {promiseAllMap} = require('../dist/clean');

describe('promiseAllMap', () => {
  test('should resolve with a Map of results when all promises resolve', async () => {
    const inputMap = new Map([
      ['someNumber', Promise.resolve(1)],
      ['someString', Promise.resolve('test')],
      ['someBoolean', Promise.resolve(true)],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get('someNumber')).toBe(1);
    expect(result.get('someString')).toBe('test');
    expect(result.get('someBoolean')).toBe(true);
  });

  test('should handle mixed promises and direct values', async () => {
    const inputMap = new Map([
      ['someNumber', Promise.resolve(1)],
      ['someString', 'test'],
      ['someBoolean', Promise.resolve(true)],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get('someNumber')).toBe(1);
    expect(result.get('someString')).toBe('test');
    expect(result.get('someBoolean')).toBe(true);
  });

  test('should reject when any promise is rejected', async () => {
    const inputMap = new Map([
      ['someNumber', Promise.resolve(1)],
      ['someString', Promise.reject('Error')],
      ['someBoolean', Promise.resolve(true)],
    ]);

    await expect(promiseAllMap(inputMap)).rejects.toBe('Error');
  });

  test('should work with single promise in the map', async () => {
    const inputMap = new Map([
      ['onlyPromise', Promise.resolve(42)],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get('onlyPromise')).toBe(42);
  });

  test('should return a Map with the same keys for mixed values', async () => {
    const inputMap = new Map([
      ['mixedKey1', Promise.resolve(10)],
      ['mixedKey2', 'static value'],
      ['mixedKey3', Promise.resolve(false)],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get('mixedKey1')).toBe(10);
    expect(result.get('mixedKey2')).toBe('static value');
    expect(result.get('mixedKey3')).toBe(false);
  });

  test('should handle mixed key types (string, number, boolean)', async () => {
    const inputMap = new Map([
      ['stringKey', Promise.resolve('stringValue')],
      [1, Promise.resolve(100)],
      [true, Promise.resolve(false)],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get('stringKey')).toBe('stringValue');
    expect(result.get(1)).toBe(100);
    expect(result.get(true)).toBe(false);
  });

  test('should handle mixed key types (string, symbol, boolean)', async () => {
    const sym1 = Symbol('symbol1');
    const sym2 = Symbol('symbol2');

    const inputMap = new Map([
      ['stringKey', Promise.resolve('stringValue')],
      [sym1, Promise.resolve('symbolValue')],
      [sym2, Promise.resolve('symbolValue 2')],
      [false, Promise.resolve('falseValue')],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get('stringKey')).toBe('stringValue');
    expect(result.get(sym1)).toBe('symbolValue');
    expect(result.get(sym2)).toBe('symbolValue 2');
    expect(result.get(false)).toBe('falseValue');
  });

  test('should handle mixed key types (number, boolean, symbol)', async () => {
    const sym1 = Symbol('symbol1');
    const sym2 = Symbol('symbol2');

    const inputMap = new Map([
      [1, Promise.resolve(1)],
      [true, Promise.resolve('trueValue')],
      [sym1, 'symbolValue'],
      [sym2, Promise.resolve('symbolValue')],
    ]);

    const result = await promiseAllMap(inputMap);
    expect(result.get(1)).toBe(1);
    expect(result.get(true)).toBe('trueValue');
    expect(result.get(sym1)).toBe('symbolValue');
    expect(result.get(sym2)).toBe('symbolValue');
  });

  test('should throw TypeError if input is not a Map', () => {
    expect(() => promiseAllMap([])).toThrow(TypeError);
    expect(() => promiseAllMap({})).toThrow(TypeError);
    expect(() => promiseAllMap(null)).toThrow(TypeError);
  });
});