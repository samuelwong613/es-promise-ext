require('../../dist/prototype/log');

test('log', async () => {
  console.log = jest.fn();
  Promise.resolve(3)
    .log()
    .then(value => {
      expect(console.log).toHaveBeenCalledWith(3);
      expect(value).toBe(3);
    })
})

test('log(console.warn)', async () => {
  console.warn = jest.fn();
  Promise.resolve('a')
    .log(console.warn)
    .then(value => {
      expect(console.warn).toHaveBeenCalledWith('a');
      expect(value).toBe('a');
    })
})

test('log(console.error, "Error:")', async () => {
  console.error = jest.fn();
  Promise.resolve(true)
    .log(console.error, "Error:")
    .then(value => {
      expect(console.error).toHaveBeenCalledWith("Error:", true);
      expect(value).toBe(true);
    })
})

test('log(1)', async () => {
  expect(
    () => 
      Promise.resolve("abc")
        .log(1)
  ).toThrow('Promise.prototype.log parameter 1 must be a function')
})

test('log("a")', async () => {
  expect(
    () => 
      Promise.resolve("abc")
        .log("a")
  ).toThrow('Promise.prototype.log parameter 1 must be a function')
})

test('log(true)', async () => {
  expect(
    () =>
      Promise.resolve("abc")
        .log(true)
  ).toThrow('Promise.prototype.log parameter 1 must be a function')
})

test('log(null)', async () => {
  expect(
    () => 
      Promise.resolve("abc")
        .log(null)
  ).toThrow('Promise.prototype.log parameter 1 must be a function')
})

test('log([].map)', async () => {
  expect(
    Promise.resolve("abc")
      .log([].map)
  ).rejects.toThrow('Array.prototype.map called on null or undefined')
})