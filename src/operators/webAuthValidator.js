import { concatMap, throwError, of } from 'rxjs';
import { base64BufferToJSON, base64BufferToString, stringToBase64Buffer } from '@/utils/buffer';

export const validateWebAuth = (type, options) => {
  return (source) => source.pipe(
    concatMap((credentials) =>{
      if (isValid(credentials.response.clientDataJSON, options, type)) {
        return of(credentials);
      } else {
        return throwError(() => 'authorization is not valid');
      }
    })
  );
};

const isValid = (clientData, options, type) => {
  const received = base64BufferToJSON(clientData);
  const originalChallenge = base64BufferToString(options.challenge);
  const receivedChallenge = base64BufferToString(stringToBase64Buffer(received.challenge));
  console.log('CHALLENG', receivedChallenge, received.challenge);

  return (
    originalChallenge === receivedChallenge &&
    window.location.hostname === new URL(received.origin).hostname &&
    received.type === type
  );
};
