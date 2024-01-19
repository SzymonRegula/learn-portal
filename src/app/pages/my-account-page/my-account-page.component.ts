import { Component } from '@angular/core';
import { MyAccountComponent } from '../../components/my-account/my-account.component';

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [MyAccountComponent],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {}
