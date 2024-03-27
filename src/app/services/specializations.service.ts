import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

type Specialization = {
  id: string;
  specialization: string;
};

@Injectable({
  providedIn: 'root',
})
export class SpecializationsService {
  private specializations$$ = new BehaviorSubject<Specialization[]>([]);
  specializations$ = this.specializations$$.asObservable();

  private http = inject(HttpClient);

  getSpecializations() {
    return this.http
      .get<Specialization[]>(
        `${environment.apiUrl}/users/trainers/specializations`
      )
      .pipe(
        tap((specializations) => this.specializations$$.next(specializations))
      );
  }
}
