export interface NativeDeferred<T> {
  promise: Promise<T>;
  resolve: any;
  reject: any;
}
export function createNativeDeferred<T>() {
  let resolve: any;
  let reject: any;

  const promise = new Promise<T>((res: any, rej: any) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve,
    reject
  };
}
