import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Credentials = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private credentials$$ = new BehaviorSubject<Credentials | null>(null);
  credentials$ = this.credentials$$.asObservable();

  saveCredentials(credentials: Credentials): void {
    this.credentials$$.next(credentials);
  }

  deleteCredentials(): void {
    this.credentials$$.next(null);
  }
}
