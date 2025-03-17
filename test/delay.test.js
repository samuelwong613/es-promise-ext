jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

require('../dist/delay');

test('Promise.delay(100)', async () => {
  const now = Date.now();
  const promise = Promise.delay(100);
  expect(promise instanceof Promise).toBe(true);
  jest.runOnlyPendingTimers();
  const value = await promise;
  const time = Date.now() - now;
  expect(time).toBeGreaterThanOrEqual(100);
  expect(time).toBeLessThan(150);
  expect(value).toBe(undefined);
})


test('Promise.delay(200)', async () => {
  const now = Date.now();
  const promise = Promise.delay(200);
  expect(promise instanceof Promise).toBe(true);
  jest.runOnlyPendingTimers();
  const value = await promise;
  const time = Date.now() - now;
  expect(time).toBeGreaterThanOrEqual(200);
  expect(time).toBeLessThan(250);
  expect(value).toBe(undefined);
})


test('invalid promise.delay', async () => {
  expect(()=>Promise.delay()).toThrow('Promise.delay parameter 1 must be a positive integer');
  expect(()=>Promise.delay(1.5)).toThrow('Promise.delay parameter 1 must be a positive integer');
  expect(()=>Promise.delay(-5)).toThrow('Promise.delay parameter 1 must be a positive integer');
  expect(()=>Promise.delay('abc')).toThrow('Promise.delay parameter 1 must be a positive integer');
  expect(()=>Promise.delay(true)).toThrow('Promise.delay parameter 1 must be a positive integer');
  expect(()=>Promise.delay(null)).toThrow('Promise.delay parameter 1 must be a positive integer');
  expect(()=>Promise.delay(()=>{})).toThrow('Promise.delay parameter 1 must be a positive integer');
})