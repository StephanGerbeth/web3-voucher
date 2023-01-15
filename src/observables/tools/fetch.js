import { catchError, finalize, from, mergeMap, retry, switchMap, throwError, timer } from 'rxjs';

export const fetchRequest = (request) => {
  return from(fetch(request))
    .pipe(
      switchMap((e) => {
        switch (e.status) {
          case 200: return e.json();
          default: return throwError(() => {
            console.log('ERROR', e.status, e, request);
            return e;
          });
        }
      }),
      retry({ delay: genericRetryStrategy() })
    );
};

// https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retrywhen
const genericRetryStrategy = ({ maxRetryAttempts = 3, scalingDuration = 1000, excludedStatusCodes = [ 400, 401, 403, 429 ] } = {}) => (attempts) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
        return throwError(() => new Error(`${error.status} - ${error.statusText} - ${error.url}`));
      }
      console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
      return timer(retryAttempt * scalingDuration);
    }),
    catchError(e => throwError(() => e)),
    finalize(() => {
      console.log('We are done!');
    })
  );
};
