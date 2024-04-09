import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../models/role.model';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CapitalizeFirstPipe, RegistrationFormComponent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  private route = inject(ActivatedRoute);
  role: Role = this.route.snapshot.params['role'];
}
