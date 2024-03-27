import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE } from '../session-storage.token';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private tokenKey = 'token';

  constructor(@Inject(SESSION_STORAGE) public sessionStorage: Storage) {}

  saveToken(token: string): void {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    this.sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.sessionStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.sessionStorage.removeItem(this.tokenKey);
  }
}
