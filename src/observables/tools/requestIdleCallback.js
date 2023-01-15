import { Observable } from 'rxjs';

// Why an Obsrvable and not a Scheduler
// https://github.com/ReactiveX/rxjs/issues/5531
// https://ncjamieson.com/how-to-use-requestidlecallback/

export const idle = () => {
  return new Observable((observer) => {
    const handle = requestIdleCallback(() => {
      observer.next();
      observer.complete();
    });
    return () => cancelIdleCallback(handle);
  });
};
