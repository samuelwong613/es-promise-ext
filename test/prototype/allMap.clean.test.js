const {allMap} = require('../../dist/clean');

describe('Promise.allMap', () => {

  test('should resolve with a Map of results when all promises resolve', async () => {
    const inputMap = new Map([
      ['someNumber', Promise.resolve(1)],
      ['someString', Promise.resolve('test')],
      ['someBoolean', Promise.resolve(true)],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
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

    const result = await Promise.resolve().then(allMap(inputMap));
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

    await expect(Promise.resolve().then(allMap(inputMap))).rejects.toBe('Error');
  });

  test('should work with single promise in the map', async () => {
    const inputMap = new Map([
      ['onlyPromise', Promise.resolve(42)],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
    expect(result.get('onlyPromise')).toBe(42);
  });

  test('should return a Map with the same keys for mixed values', async () => {
    const inputMap = new Map([
      ['mixedKey1', Promise.resolve(10)],
      ['mixedKey2', 'static value'],
      ['mixedKey3', Promise.resolve(false)],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
    expect(result.get('mixedKey1')).toBe(10);
    expect(result.get('mixedKey2')).toBe('static value');
    expect(result.get('mixedKey3')).toBe(false);
  });

  test('should handle number keys', async () => {
    const inputMap = new Map([
      [1, Promise.resolve(123)],
      [2, Promise.resolve('value')],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
    expect(result.get(1)).toBe(123);
    expect(result.get(2)).toBe('value');
  });

  test('should handle boolean keys', async () => {
    const inputMap = new Map([
      [true, Promise.resolve(true)],
      [false, Promise.resolve('falseValue')],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
    expect(result.get(true)).toBe(true);
    expect(result.get(false)).toBe('falseValue');
  });

  test('should handle symbol keys', async () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');

    const inputMap = new Map([
      [sym1, Promise.resolve('symbolValue1')],
      [sym2, Promise.resolve('symbolValue2')],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
    expect(result.get(sym1)).toBe('symbolValue1');
    expect(result.get(sym2)).toBe('symbolValue2');
  });

  test('should handle mixed key types (string, number, boolean, symbol)', async () => {
    const sym1 = Symbol('symbol1');

    const inputMap = new Map([
      ['stringKey', Promise.resolve('stringValue')],
      [1, Promise.resolve(100)],
      [true, Promise.resolve(false)],
      [sym1, Promise.resolve('symbolValue')],
    ]);

    const result = await Promise.resolve().then(allMap(inputMap));
    expect(result.get('stringKey')).toBe('stringValue');
    expect(result.get(1)).toBe(100);
    expect(result.get(true)).toBe(false);
    expect(result.get(sym1)).toBe('symbolValue');
  });

  test('should throw TypeError if input is not a Map', () => {
    expect(() => Promise.resolve().then(allMap([]))).toThrow(TypeError);
    expect(() => Promise.resolve().then(allMap({}))).toThrow(TypeError);
    expect(() => Promise.resolve().then(allMap(null))).toThrow(TypeError);
  });
});