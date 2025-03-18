jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

const {delay} = require('../../dist/clean');

test('Promise.resolve("a").delay(100)', async () => {
  const now = Date.now();
  const promise = Promise.resolve('a')
    .then(delay(100))
    .then(value => {
      const time = Date.now() - now;
      expect(time).toBeGreaterThanOrEqual(100);
      expect(time).toBeLessThan(150);
      expect(value).toBe('a');
    })

  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  return await promise; 
})


test('Promise.resolve(object).delay(200)', async () => {
  const now = Date.now();
  const object = {};
  const promise = Promise.resolve(object)
    .then(delay(200))
    .then(value => {
      const time = Date.now() - now;
      expect(time).toBeGreaterThanOrEqual(200);
      expect(time).toBeLessThan(350);
      expect(value).toBe(object);
    })

  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  return await promise; 
})


test('Promise.resolve(true).delay(100)', async () => {
  const now = Date.now();
  const promise = Promise.resolve(true)
    .then(delay(100))
    .then(value => {
      const time = Date.now() - now;
      expect(time).toBeGreaterThanOrEqual(100);
      expect(time).toBeLessThan(150);
      expect(value).toBe(true);
    })

  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  return await promise;  
})


test('invalid promise.delay', async () => {
  expect(()=>Promise.resolve(true).then(delay())).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).then(delay(1.5))).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).then(delay(-5))).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).then(delay('abc'))).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).then(delay(true))).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).then(delay(null))).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).then(delay(()=>{}))).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
})