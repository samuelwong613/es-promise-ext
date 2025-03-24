export default function promiseAllWithMap(values: Map<any, Promise<unknown> | unknown>): Promise<Map<any, any>> {
  if (!(values instanceof Map))
    throw TypeError('Promise.allMap parameter 1 must be a Map');

  const keys = Array.from(values.keys());
  const promises: Array<Promise<unknown>|unknown> = [];

  for (let key of keys){
    promises.push(values.get(key));
  }

  return Promise.all(promises).then(resolvedPromise => {
    const result = new Map();

    for (let key of keys){
      result.set(key, resolvedPromise.shift())
    }
      
    return result;
  });
}