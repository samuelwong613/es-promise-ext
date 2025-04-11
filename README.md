# es-promise-ext
Native promise extensions for `javascript` and `typescript`.<br/>
> [!IMPORTANT]
> This library extend the native objects `Promise.prototype`.  This may lead to collision with other libraries or the latest version of ECMAScript.
<br/>
<br/>

# Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Functions](#Functions)
4. [Advanced Usage](#Advanced-Usage)
5. [Test](#Test)
6. [License](#License)
<br/>

# Installation
Under your project folder, run the follow command in the terminal.
```
npm i --save es-promise-ext
```
<br/>

# Usage
### Prototype Version
```ts
// For Promise prototype
// Import at the entry point of the project, such as index.ts
import from "es-promise-ext"

Promise.resolve(1)
  .delay(500)
  .then(value => {
    // do something
  });
```

### Clean Version - (*Non prototype pollution*) 
```ts
// For non-pollution
// Import at the .ts file where you are going to use
import { delay, ... } from "es-promise-ext/clean"

Promise.resolve(1)
  .then(delay(500))
  .then(value => {
    // do something
  });
```
<br/>

# Functions

### Promise

<details>
<summary> Promise.allWith() </summary>
<br/>

> Creates a Promise that is resolved with an array, an object or a Map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.

##### $${\color{gray}Parameters}$$
| Param  | Type | Desc|
| - | - | - |
| values  | Promise[]  | an array of provided promise for resolving. |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| any[]  | a new promise for resolved results. |

#### $${\color{gray}Example}$$
```ts
Promise.allWith(
  [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]
) 
// return [1,2,3] in the subsequent promise
```

-----

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| values  | object  | an object of provided promise for resolving. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| object  | a new promise for resolved results. |

#### ${\color{gray}Example}$
```ts
Promise.allWith(
  {
    someNumber: Promise.resolve(1),
    someString: Promise.resolve('test'),
    someBoolean: Promise.resolve(true)
  }
)     
// return the resolved object in the subsequent promise
```

-----

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| values  | Map  | a Map of provided promise for resolving. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| Map  | a new promise for resolved results. |

#### ${\color{gray}Example}$
```ts
Promise.allWith(
  new Map(
    Object.entries({
      someNumber: Promise.resolve(1),
      someString: Promise.resolve('test'),
      someBoolean: Promise.resolve(true)
    })
  )
)     
// return the resolved object in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.delay()</summary>  
<br/>

> Start promise after delaying.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| millisecond  | number  | a time for the delay. |

#### ${\color{gray}Example}$
```ts
Promise.delay(300)  // return a void promise after delay 300 ms
```
-----
</details>

<details>
<summary> Promise.reduce()</summary>  
<br/>

> Creates a Promise that is resolved sequentially with a result when all of the provided Promises resolve, or rejected when any Promise is rejected.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunctions  | function[]  | an array of async functions. |
| options  | object *(Optional)*  |  -  |
| options.canceller  | object  | set `canceller.cancelled = true` stopping the sequence |
| options.progress  | `(subResult, step, total) => any`  | to show the progress and the sub result |
| options.initValue  | any  | the initial value which pass to the first async function |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result of last resolved promise |

#### ${\color{gray}Example}$
```ts
Promise.reduce(
  [
    plus(5),
    minus(2),
  ],
  {
    canceller: { cancelled: false }, 
    // set to true later
    progress: (subResult, step, total) => 
      { 
        console.log(subResult) 
        console.log(`${((step+1) / total)}%`)
      },
    initValue: 1
  }
)     
// return 4 in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.retry()</summary>  
<br/>

> Starts a promise with an asynchronous function that has retry tolerance.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunction  | function | an asynchronous function or promise that holds the result. |
| count  | number *(Optional; default = 3)*  |  a positive integer between 0 and 30 indicating the number of retries. |
| delay  | number *(Optional; default = 100)*  |  the time in milliseconds to wait between retries. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | The result within a promise after retries. |

#### ${\color{gray}Example}$
```ts
Promise.retry(asyncFunction); 
Promise.retry(promise); 
Promise.retry(asyncFunction, 5, 1000); 
Promise.retry(promise, 5, 1000); 
```

-----
</details>

<details>
<summary> Promise.sequence()</summary>  
<br/>

> Creates a Promise that is resolved sequentially with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunctions  | function[]  | an array of async functions. |
| options  | object *(Optional)*  |  -  |
| options.canceller  | object  | set `canceller.cancelled = true` stopping the sequence |
| options.progress  | `(subResult, step, total) => any`  | to show the progress and the sub result |
| options.skipIfError  | boolean  |  -  |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any[]  | the result of resolved promise in an array |

#### ${\color{gray}Example}$
```ts
Promise.sequence(
  [
    () => Promise.resolve(1),
    () => Promise.resolve(2),
    () => Promise.resolve(3),
  ],
  {
    canceller: { cancelled: false }, 
    // set to true later
    progress: (subResult, step, total) => 
      { 
        console.log(subResult) 
        console.log(`${((step+1) / total)}%`)
      },
    skipIfError: true
  }
)     
// return [1,2,3] in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.then()</summary>  
<br/>

> Start promise with a function, which `Promise.resolve()` does not support.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunction  | function  | an async function which will be called and pass the result in promise |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result of the resolved promise |

#### ${\color{gray}Example}$
```ts
Promise.then(3)          // return 3 in a promise
Promise.then(() => 3)    // return 3 in a promise
Promise.then(async () => Promise.resolve(3))    // return 3 in a promise
```

-----
</details>

<details>
<summary> Promise.timeOut()</summary>  
<br/>

> Call the async function with time out limit.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunctions  | function  | an async function or promise which will be called and pass the result in promise |
| millisecond  | number *(Optional; default = 1000)* | the time limit for the time out. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result of the resolved promise |

#### ${\color{gray}Example}$
```ts
Promise.timeOut(asyncFunction, 300)          
Promise.timeOut(promise, 300)          
// return a promise within 300 ms, otherwise reject with time out error
```

-----
</details>

<details>
<summary> Promise.wrap()</summary>  
<br/>

> Starts a promise with an asynchronous function that use a callback.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| wrappedAsyncFunctionWithCallback  | function  | an asynchronous function that will be called, returning a result in callback. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result returned from callback |

#### ${\color{gray}Example}$
```ts
Promise.wrap(asyncFunction)      
// for asyncFunction accepting the callback as 1st parameter   

Promise.wrap(cb => asyncFunction(1, 2, cb))          
// for other asyncFunction accepting the callback as the rest parameter
```

</details>

-----

### Promise.prototype

<details>
<summary> Promise.prototype.all() </summary>
<br/>

> Creates a Promise that is resolved with an array, an object or a Map of results when all of the provided Promises resolve, or rejected when any Promise is rejected.

##### $${\color{gray}Parameters}$$
| Param  | Type | Desc|
| - | - | - |
| values  | Promise[]  | an array of provided promise for resolving. |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| any[]  | a new promise for resolved results. |

#### $${\color{gray}Example}$$
```ts
Promise.resolve()
  .all(
    [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ]
  ) 
// return [1,2,3] in the subsequent promise
```

-----

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| values  | object  | an object of provided promise for resolving. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| object  | a new promise for resolved results. |

#### ${\color{gray}Example}$
```ts
Promise.resolve()
  .all(
    {
      someNumber: Promise.resolve(1),
      someString: Promise.resolve('test'),
      someBoolean: Promise.resolve(true)
    }
  )     
// return the resolved object in the subsequent promise
```

-----

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| values  | Map  | a Map of provided promise for resolving. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| Map  | a new promise for resolved results. |

#### ${\color{gray}Example}$
```ts
Promise.resolve()
  .all(
    new Map(
      Object.entries({
        someNumber: Promise.resolve(1),
        someString: Promise.resolve('test'),
        someBoolean: Promise.resolve(true)
      })
    )
  )     
// return the resolved object in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.prototype.allSettled() </summary>
<br/>

> Creates a Promise that is resolved with an array of results when all of the provided Promises resolve or reject.

##### $${\color{gray}Parameters}$$
| Param  | Type | Desc|
| - | - | - |
| values  | Promise[]  | an array of provided promise for resolving. |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| any[]  | a new promise for resolved results. |

#### $${\color{gray}Example}$$
```ts
Promise.resolve()
  .allSettled(
    [
      Promise.resolve(1),
      Promise.reject(2),
    ]
  ) 
// return [{status: 'fulfilled', value: 1},{status: 'rejected', value: 2}] in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.prototype.delay()</summary>  
<br/>

> Start promise after delaying.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| millisecond  | number  | a time for the delay. |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| any | A value which pass through within a promise. |

#### ${\color{gray}Example}$
```ts
Promise.resolve('a')
  .delay(300)  
  .then(doSomething)  
  // return 'a' in a promise after delay 300 ms
```
-----
</details>

<details>
<summary> Promise.prototype.log()</summary>  
<br/>

> Start promise after delaying.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| logger  | function *(Optional; default = console.log)*  | a logging tool |
| ...args  | any[] *(Optional)*  | the rest of arguments |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| any | A value which pass through within a promise. |

#### ${\color{gray}Example}$
```ts
Promise.resolve('a')
  .log()  
  .then(doSomething)  
  // return 'a' in a promise after delay 300 ms

Promise.resolve('a')
  .log(console.debug, 'My value is:')  
  .then(doSomething)  
  // return 'a' in a promise after delay 300 ms
```
-----
</details>

<details>
<summary> Promise.prototype.reduce()</summary>  
<br/>

> Creates a Promise that is resolved sequentially with a result when all of the provided Promises resolve, or rejected when any Promise is rejected.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunctions  | function[]  | an array of async functions. |
| options  | object *(Optional)*  |  -  |
| options.canceller  | object  | set `canceller.cancelled = true` stopping the sequence |
| options.progress  | `(subResult, step, total) => any`  | to show the progress and the sub result |
| options.initValue  | any  | the initial value which pass to the first async function |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result of last resolved promise |

#### ${\color{gray}Example}$
```ts
Promise.resolve()
  .reduce(
    [
      plus(5),
      minus(2),
    ],
    {
      canceller: { cancelled: false }, 
      // set to true later
      progress: (subResult, step, total) => 
        { 
          console.log(subResult) 
          console.log(`${((step+1) / total)}%`)
        },
      initValue: 1
    }
  )     
// return 4 in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.prototype.reject()</summary>  
<br/>

> Reject with error in the promise chain.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| reason  | any  | the reason of the error |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| never | the error which throw in the promise |

#### ${\color{gray}Example}$
```ts
Promise.resolve()
  .reject('a')  
  .catch(error => console.error(error))
```
-----
</details>

<details>
<summary> Promise.prototype.resolve()</summary>  
<br/>

> Resolve the value in the promise chain.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| value  | any  | the value which would be like to pass through |

##### $${\color{gray}Return}$$
| Type | Desc|
| - | - |
| any | the value which pass through within a promise|

#### ${\color{gray}Example}$
```ts
Promise.resolve()
  .resolve('a')  
  .then(doSomething)      
// return 'a' in the subsequent promise
```
-----
</details>

<details>
<summary> Promise.prototype.retry()</summary>  
<br/>

> Starts a promise with an asynchronous function that has retry tolerance.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunction  | function | an asynchronous function or promise that holds the result. |
| count  | number *(Optional; default = 3)*  |  a positive integer between 0 and 30 indicating the number of retries. |
| delay  | number *(Optional; default = 100)*  |  the time in milliseconds to wait between retries. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | The result within a promise after retries. |

#### ${\color{gray}Example}$
```ts
Promise.resolve().retry(asyncFunction); 
Promise.resolve().retry(promise); 
Promise.resolve().retry(asyncFunction, 5, 1000); 
Promise.resolve().retry(promise, 5, 1000); 
```

-----
</details>

<details>
<summary> Promise.prototype.sequence()</summary>  
<br/>

> Creates a Promise that is resolved sequentially with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunctions  | function[]  | an array of async functions. |
| options  | object *(Optional)*  |  -  |
| options.canceller  | object  | set `canceller.cancelled = true` stopping the sequence |
| options.progress  | `(subResult, step, total) => any`  | to show the progress and the sub result |
| options.skipIfError  | boolean  |  -  |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any[]  | the result of resolved promise in an array |

#### ${\color{gray}Example}$
```ts
Promise.resolve().sequence(
  [
    () => Promise.resolve(1),
    () => Promise.resolve(2),
    () => Promise.resolve(3),
  ],
  {
    canceller: { cancelled: false }, 
    // set to true later
    progress: (subResult, step, total) => 
      { 
        console.log(subResult) 
        console.log(`${((step+1) / total)}%`)
      },
    skipIfError: true
  }
)     
// return [1,2,3] in the subsequent promise
```

-----
</details>

<details>
<summary> Promise.prototype.timeOut()</summary>  
<br/>

> Call the async function with time out limit.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| asyncFunctions  | function  | an async function or promise which will be called and pass the result in promise |
| millisecond  | number *(Optional; default = 1000)* | the time limit for the time out. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result of the resolved promise |

#### ${\color{gray}Example}$
```ts
Promise.resolve().timeOut(asyncFunction, 300)          
Promise.resolve().timeOut(promise, 300)          
// return a promise within 300 ms, otherwise reject with time out error
```

-----
</details>

<details>
<summary> Promise.prototype.wrap()</summary>  
<br/>

> Starts a promise with an asynchronous function that use a callback.

##### ${\color{gray}Parameters}$
| Param  | Type | Desc|
| - | - | - |
| wrappedAsyncFunctionWithCallback  | function  | an asynchronous function that will be called, returning a result in callback. |

##### ${\color{gray}Return}$
| Type | Desc|
| - | - |
| any  | the result returned from callback |

#### ${\color{gray}Example}$
```ts
Promise.resolve()
  .wrap(asyncFunction)      
// for asyncFunction accepting the callback as 1st parameter   

Promise.resolve()
  .wrap(cb => asyncFunction(1, 2, cb))          
// for other asyncFunction accepting the callback as the rest parameter
```

-----
</details>

<br/>

# Advanced Usage

### Clean Import - (*Non prototype pollution*) 
```ts
// For non-pollution
import { promiseWrap, delay, ... } from "es-promise-ext/clean"

promiseWrap(callback => someCallbackFunction(1, callback))
  .then(delay(500))
  .then(value => {
    // do something
  });
```

### Specifc Function - (*To avoid collision with other libraries*)
```ts
import "es-promise-ext/prototype/delay"
import "es-promise-ext/wrap"

Promise.wrap(callback => someCallbackFunction(1, callback))
  .delay(500)
  .then(value => {
    // do something
  });
```

<br/>

# Test
```ts
npm run test
```
<br/>

# License
- MIT License
<br/>
