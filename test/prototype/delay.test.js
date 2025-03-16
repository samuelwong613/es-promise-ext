require('../../dist/prototype/delay/index');

test('Promise.resolve("a").delay(100)', async () => {
  const now = Date.now();
  Promise.resolve('a')
    .delay(100)
    .then(value => {
      const time = Date.now() - now;
      expect(time).toBeGreaterThan(100);
      expect(time).toBeLessThan(300);
      expect(value).toBe('a');
    })
})


test('Promise.resolve(object).delay(200)', async () => {
  const now = Date.now();
  const object = {};
  Promise.resolve(object)
    .delay(200)
    .then(value => {
      const time = Date.now() - now;
      expect(time).toBeGreaterThan(200);
      expect(time).toBeLessThan(400);
      expect(value).toBe(object);
    })
})


test('Promise.resolve(true).delay(100)', async () => {
  const now = Date.now();
  Promise.resolve(true)
    .delay(100)
    .then(value => {
      const time = Date.now() - now;
      expect(time).toBeGreaterThan(100);
      expect(time).toBeLessThan(300);
      expect(value).toBe(true);
    })
})


test('invalid promise.delay', async () => {
  expect(()=>Promise.resolve(true).delay()).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).delay(1.5)).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).delay(-5)).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).delay('abc')).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).delay(true)).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).delay(null)).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
  expect(()=>Promise.resolve(true).delay(()=>{})).toThrow('Promise.prototype.delay parameter 1 must be a positive integer');
})