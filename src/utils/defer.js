export const PENDING = Symbol('pending');
export const FULFILLED = Symbol('fulfilled');
export const REJECTED = Symbol('rejected');

export default () => {
  const obj = {
    state: PENDING
  };

  return Object.assign(
    new Promise((resolve, reject) => {
      obj.resolve = (...args) => {
        obj.state = FULFILLED;
        resolve(...args);
        return this;
      },
      obj.reject = (...args) => {
        obj.state = REJECTED;
        reject(...args);
        return this;
      };
    }),
    obj
  );
};
