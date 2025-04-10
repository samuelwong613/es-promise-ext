export type AllWithMapFunction = () => Promise<Map<any, any>>

export default function allWithMap(values: Map<any, Promise<unknown> | unknown>): AllWithMapFunction {
  const keys = Array.from(values.keys());
  const promises: Array<Promise<unknown>|unknown> = [];

  for (let key of keys){
    promises.push(values.get(key));
  }

  return () => Promise.all(promises).then(resolvedPromise => {
    const result = new Map();

    for (let key of keys){
      result.set(key, resolvedPromise.shift())
    }
      
    return result;
  });
}