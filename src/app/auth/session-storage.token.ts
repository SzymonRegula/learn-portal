import { InjectionToken } from '@angular/core';

const mockSessionStorage = {
  length: 0,
  clear: () => {},
  getItem: () => null,
  key: () => null,
  removeItem: () => {},
  setItem: () => {},
};

export const SESSION_STORAGE = new InjectionToken<Storage>('Session storage', {
  providedIn: 'root',
  factory: () =>
    typeof window === 'undefined' ? mockSessionStorage : sessionStorage,
});
