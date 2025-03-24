export type AllWithObjectFunction<T> = () => Promise<{ [key in keyof T]: Awaited<T[key]>; }>

export default function allWithObject<T extends Record<string, Promise<unknown>|unknown>>(values: T): AllWithObjectFunction<T> {
  if (typeof values !== 'object' || (values instanceof Array))
    throw TypeError('Promise.prototype.allObject parameter 1 must be an object');

  type KeyOf = keyof typeof values;

  const keys = [...Object.keys(values), ...Object.getOwnPropertySymbols(values)] as KeyOf[];
  const promises = keys.map((key) => values[key]);  

  return () => Promise.all(promises).then(resolvedPromise => {
    type ResultType = {
      [key in KeyOf]: Awaited<T[key]>
    };

    const result: ResultType = {} as ResultType;
  
    keys.forEach((key, index)=>{
      result[key] = resolvedPromise[index];
    })
    
    return result as ResultType;
  });
}