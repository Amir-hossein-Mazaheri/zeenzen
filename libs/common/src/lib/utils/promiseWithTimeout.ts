export function promiseWithTimeout(timeout: number, promise: Promise<unknown>) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Promise with timeout: promise timed out.'));
    }, timeout);

    promise.then(resolve, reject);
  });
}
