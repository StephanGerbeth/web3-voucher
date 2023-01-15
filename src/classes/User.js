
import { fetchRequest } from '@/observables/tools/fetch';
import { lastValueFrom } from 'rxjs';

export default class User {
  constructor(info) {
    this.info = info;
  }
}

export const createUser = async (seed) => {
  const url = new URL('/api/random', window.location.origin);
  url.searchParams.append('seed', seed);
  const result = await lastValueFrom(fetchRequest(new Request(url)));
  return new User(result);
};
