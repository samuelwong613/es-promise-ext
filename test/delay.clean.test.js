const {promiseDelay} = require('../dist/clean');

test('promiseDelay(100)', async () => {
  const now = Date.now();
  const promise = promiseDelay(100);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    const time = Date.now() - now;
    expect(time).toBeGreaterThan(100);
    expect(time).toBeLessThan(200);
    expect(value).toBe(undefined);
  })
})


test('promiseDelay(200)', async () => {
  const now = Date.now();
  const promise = promiseDelay(200);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    const time = Date.now() - now;
    expect(time).toBeGreaterThan(200);
    expect(time).toBeLessThan(300);
    expect(value).toBe(undefined);
  })
})


test('invalid promiseDelay', async () => {
  expect(()=>promiseDelay()).toThrow('promiseDelay parameter 1 must be a positive integer');
  expect(()=>promiseDelay(1.5)).toThrow('promiseDelay parameter 1 must be a positive integer');
  expect(()=>promiseDelay(-5)).toThrow('promiseDelay parameter 1 must be a positive integer');
  expect(()=>promiseDelay('abc')).toThrow('promiseDelay parameter 1 must be a positive integer');
  expect(()=>promiseDelay(true)).toThrow('promiseDelay parameter 1 must be a positive integer');
  expect(()=>promiseDelay(null)).toThrow('promiseDelay parameter 1 must be a positive integer');
  expect(()=>promiseDelay(()=>{})).toThrow('promiseDelay parameter 1 must be a positive integer');
})