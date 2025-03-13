require('../dist/then');

test('Promise.then(3)', async () => {
  const promise = Promise.then(3);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})


test('Promise.then(true)', async () => {
  const promise = Promise.then(true);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(true);
  })
})


test('Promise.then("a")', async () => {
  const promise = Promise.then("a");
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe("a");
  })
})


test('Promise.then(() => 3)', async () => {
  const promise = Promise.then(3);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})


test('Promise.then(() => true)', async () => {
  const promise = Promise.then(true);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(true);
  })
})


test('Promise.then(() => "a")', async () => {
  const promise = Promise.then("a");
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

test('Promise.then(func)', async () => {
  const promise = Promise.then(func);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(10);
  })
})

test('Promise.then(func(3))', async () => {
  const promise = Promise.then(func(3));
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

test('Promise.then(asyncFunc)', async () => {
  const promise = Promise.then(asyncFunc);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(10);
  })
})

test('Promise.then(asyncFunc(3))', async () => {
  const promise = Promise.then(asyncFunc(3));
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


test('Promise.then(asyncArrowFunc)', async () => {
  const promise = Promise.then(asyncArrowFunc);
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(10);
  })
})

test('Promise.then(asyncArrowFunc(3))', async () => {
  const promise = Promise.then(asyncArrowFunc(3));
  expect(promise instanceof Promise).toBe(true);
  promise.then(value => {
    expect(value).toBe(3);
  })
})
