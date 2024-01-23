import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type UserType = 'student' | 'trainer' | 'unknown';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userType$$ = new BehaviorSubject<UserType>('unknown');
  userType$ = this.userType$$.asObservable();

  getUser(login: string) {
    // TODO: Send request to backend to get user data
    if (login === 'trainer') {
      return this.userType$$.next('trainer');
    } else {
      return this.userType$$.next('student');
    }
  }
}
