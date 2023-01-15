import { fromEventPattern } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export const getCameraPermissionObservable = async () => {
  return requestPermission({ name: 'camera', userVisibleOnly: 'true' });
}

const requestPermission = async (options) => {
  const permission = await navigator.permissions.query(options);
  return getObservable(permission).pipe(
    map(({currentTarget}) => currentTarget),
    startWith(permission)
  );
}

const getObservable = (permission) => {
  return fromEventPattern(
    (handler) => permission.onchange = handler,
    () => permission.onchange = null
  )
}
