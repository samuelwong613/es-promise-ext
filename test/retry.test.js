jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
require('../dist/retry');

test('Promise.retry(asyncFunction)', async () => {
  let retryCount = 0;
  const asyncFunction = async () => {
    retryCount++;
  
    if (retryCount % 3 === 0)
      return Promise.resolve(retryCount);
    else
      throw new Error(`retry count: ${retryCount}`);
  }

  await expect(()=>asyncFunction()).rejects.toThrow(`retry count: 1`);

  const firstPromise = Promise.retry(asyncFunction);
  expect(firstPromise instanceof Promise).toBe(true);
  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  expect(await firstPromise).toBe(3);

  await expect(()=>asyncFunction()).rejects.toThrow(`retry count: 4`);

  const secondPromise = Promise.retry(asyncFunction);
  expect(secondPromise instanceof Promise).toBe(true);
  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  expect(await secondPromise).toBe(6);

})

test('Promise.retry(asyncFunction, 5)', async () => {
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
  const failPromise = Promise.retry(asyncFunction);
  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  await expect(()=>failPromise).rejects.toThrow(`retry count: 4`);

  retryCount = 0;
  const promise = Promise.retry(asyncFunction, 10);
  expect(promise instanceof Promise).toBe(true);
  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  expect(await promise).toBe(6);
})

test('Promise.retry(asyncFunction, 5, 200)', async () => {
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
  const promise = Promise.retry(asyncFunction, 10, 200);
  expect(promise instanceof Promise).toBe(true);
  for(let i = 0; i < 100; i++) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
  expect(await promise).toBe(6);
  for (let i=0; i < retryTimes.length-1; i++){
    const diff = retryTimes[i+1] - retryTimes[i];
    expect(diff).toBeGreaterThanOrEqual(200);
  }
})

test('Promise.retry(promise)', async () => {
  expect(async () => await Promise.retry(Promise.reject(`Error`))).rejects.toMatch(`Error`);

  const promise = Promise.retry(Promise.resolve('a'));
  expect(promise instanceof Promise).toBe(true);
  expect(await promise).toBe('a');
})

test('Promise.retry(promise, 5)', async () => {
  expect(async () => await Promise.retry(Promise.reject(`Error`), 5)).rejects.toMatch(`Error`);

  const promise = Promise.retry(Promise.resolve('a'), 5);
  expect(promise instanceof Promise).toBe(true);
  expect(await promise).toBe('a');
})

test('Promise.retry(promise, 5, 10)', async () => {
  expect(async () => await Promise.retry(Promise.reject(`Error`), 5, 10)).rejects.toMatch(`Error`);

  const promise = Promise.retry(Promise.resolve('a'), 5, 10);
  expect(promise instanceof Promise).toBe(true);
  expect(await promise).toBe('a');
})