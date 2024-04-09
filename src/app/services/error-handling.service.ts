import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  handleError(error: HttpErrorResponse) {
    const customError = {
      message: error.error.message || error.message,
      status: error.status,
    };

    return throwError(() => customError);
  }
}
