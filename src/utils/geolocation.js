import { from, switchMap, firstValueFrom } from 'rxjs';
import { getGeolocationPermissionObservable } from './permissions';

export const getGeolocationObservable = async () => {
  const observable = await getGeolocationPermissionObservable();

  return observable.pipe(
    switchMap(() => {
      return from(getGeolocation());
    })
  );
};

export const getCurrentGeolocation = async () => {
  return firstValueFrom(await getGeolocationObservable());
};

const getGeolocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ state: 'granted', position }),
      () => reject({ state: 'denied', position: null })
    );
  });

};
