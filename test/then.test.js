const {then} = require('../dist/clean');

test('then(3)', async () => {
  const promise = then(3);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})


test('then(true)', async () => {
  const promise = then(true);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(true);
  })
})


test('then("a")', async () => {
  const promise = then("a");
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe("a");
  })
})


test('then(() => 3)', async () => {
  const promise = then(3);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})


test('then(() => true)', async () => {
  const promise = then(true);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(true);
  })
})


test('then(() => "a")', async () => {
  const promise = then("a");
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe("a");
  })
})


function func(value){
  if (value === undefined)
    return 10;
  else
    return value;
}

test('then(func)', async () => {
  const promise = then(func);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(10);
  })
})

test('then(func(3))', async () => {
  const promise = then(func(3));
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})

async function asyncFunc(value){
  return new Promise(resolve=>{
    if (value === undefined)
      resolve(10);
    else
      resolve(value);
  })
} 

test('then(asyncFunc)', async () => {
  const promise = then(asyncFunc);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(10);
  })
})

test('then(asyncFunc(3))', async () => {
  const promise = then(asyncFunc(3));
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})


const asyncArrowFunc = async (value) => 
  new Promise( (resolve) => {
    if (value === undefined)
      resolve(10)
    else
      resolve(value)
  });


test('then(asyncArrowFunc)', async () => {
  const promise = then(asyncArrowFunc);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(10);
  })
})

test('then(asyncArrowFunc(3))', async () => {
  const promise = then(asyncArrowFunc(3));
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})
