import { from } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { getCameraPermissionObservable } from './permissions';

export const getCameraList = async () => {
  return navigator.mediaDevices.enumerateDevices();
};

export const getCameraStreamObservable = async (options = { video: true, audio: false }) => {
  const observable = await getCameraPermissionObservable();

  return observable.pipe(
    switchMap(() => from(getStream(options))),
    shareReplay(1)
  );
};

const getStream = async (options) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(options);
    return { state: 'granted', stream };
  } catch(e) {
    return { state: 'denied', stream: createEmptyStream() };
  }
};

const createEmptyStream = () => {
  return null;
};
