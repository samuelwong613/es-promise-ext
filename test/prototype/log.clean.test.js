const {log} = require('../../dist/clean');

test('log', async () => {
  console.log = jest.fn();
  Promise.resolve(3)
    .then(log())
    .then(value => {
      expect(console.log).toHaveBeenCalledWith(3);
      expect(value).toBe(3);
    })
})

test('log(console.warn)', async () => {
  console.warn = jest.fn();
  Promise.resolve('a')
    .then(log(console.warn))
    .then(value => {
      expect(console.warn).toHaveBeenCalledWith('a');
      expect(value).toBe('a');
    })
})

test('log(console.error, "Error:")', async () => {
  console.error = jest.fn();
  Promise.resolve(true)
    .then(log(console.error, "Error:"))
    .then(value => {
      expect(console.error).toHaveBeenCalledWith("Error:", true);
      expect(value).toBe(true);
    })
})

test('log(1)', async () => {
  expect(
    () => 
      Promise.resolve("abc")
        .then(log(1))
  ).toThrow('log parameter 1 must be a function')
})

test('log("a")', () => {
  expect(
    () => 
      Promise.resolve("abc")
        .then(log("a"))
  ).toThrow('log parameter 1 must be a function')
})

test('log(true)', () => {
  expect(
    () => 
      Promise.resolve("abc")
        .then(log(true))
  ).toThrow('log parameter 1 must be a function')
})

test('log(null)', () => {
  expect(
    () => 
      Promise.resolve("abc")
        .then(log(null))
  ).toThrow('log parameter 1 must be a function')
})

test('log([].map)', async () => {
  expect(
    Promise.resolve("abc")
      .then(log([].map))
  ).rejects.toThrow('Array.prototype.map called on null or undefined')
})