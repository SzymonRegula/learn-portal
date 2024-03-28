import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { CustomDateService } from '../services/custom-date.service';

@Directive({
  selector: '[appDdmmyyyyValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DdmmyyyyValidatorDirective,
      multi: true,
    },
  ],
})
export class DdmmyyyyValidatorDirective {
  constructor(private customDateService: CustomDateService) {}

  validate(control: AbstractControl): ValidationErrors | null {
    return this.customDateService.ddmmyyyyValidator()(control);
  }
}
