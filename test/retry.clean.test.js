const {promiseRetry} = require('../dist/clean');

test('promiseRetry(asyncFunction)', async () => {
  let retryCount = 0;
  const asyncFunction = async () => {
    retryCount++;
  
    if (retryCount % 3 === 0)
      return Promise.resolve(retryCount);
    else
      throw new Error(`retry count: ${retryCount}`);
  }

  await expect(()=>asyncFunction()).rejects.toThrow(`retry count: 1`);

  const firstPromise = await promiseRetry(asyncFunction);
  expect(firstPromise).toBe(3);

  await expect(()=>asyncFunction()).rejects.toThrow(`retry count: 4`);

  const secondPromise = await promiseRetry(asyncFunction);
  expect(secondPromise).toBe(6);

})

test('promiseRetry(asyncFunction, 5)', async () => {
  let retryCount = 0;
  const asyncFunction = async () => {
    retryCount++;
  
    if (retryCount % 6 === 0)
      return Promise.resolve(retryCount);
    else
      throw new Error(`retry count: ${retryCount}`);
  }

  await expect(()=>asyncFunction()).rejects.toThrow(`retry count: 1`);

  retryCount = 0;
  await expect(()=>promiseRetry(asyncFunction)).rejects.toThrow(`retry count: 4`);

  retryCount = 0;
  const secondPromise = await promiseRetry(asyncFunction, 10);
  expect(secondPromise).toBe(6);
})

test('promiseRetry(asyncFunction, 5, 200)', async () => {
  const retryTimes = [];
  const asyncFunction = async () => {
    retryTimes.push(Date.now());
  
    if (retryTimes.length % 6 === 0)
      return Promise.resolve(retryTimes.length);
    else
      throw new Error(`retry count: ${retryTimes.length}`);
  }

  await expect(()=>asyncFunction()).rejects.toThrow(`retry count: 1`);

  retryTimes.splice(0, retryTimes.length);
  const secondPromise = await promiseRetry(asyncFunction, 10, 200);
  expect(secondPromise).toBe(6);
  for (let i=0; i < retryTimes.length-1; i++){
    const diff = retryTimes[i+1] - retryTimes[i];
    expect(diff).toBeGreaterThanOrEqual(200);
  }
})

test('promiseRetry(promise)', async () => {
  expect(async () => await promiseRetry(Promise.reject(`Error`))).rejects.toMatch(`Error`);

  const promise = promiseRetry(Promise.resolve('a'));
  expect(promise instanceof Promise).toBe(true);
  expect(await promise).toBe('a');
})

test('promiseRetry(promise, 5)', async () => {
  expect(async () => await promiseRetry(Promise.reject(`Error`), 5)).rejects.toMatch(`Error`);

  const promise = promiseRetry(Promise.resolve('a'), 5);
  expect(promise instanceof Promise).toBe(true);
  expect(await promise).toBe('a');
})

test('promiseRetry(promise, 5, 10)', async () => {
  expect(async () => await promiseRetry(Promise.reject(`Error`), 5, 10)).rejects.toMatch(`Error`);

  const promise = promiseRetry(Promise.resolve('a'), 5, 10);
  expect(promise instanceof Promise).toBe(true);
  expect(await promise).toBe('a');
})