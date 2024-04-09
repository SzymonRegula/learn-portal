import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faXTwitter,
  faFacebook,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FormsModule, NgModel } from '@angular/forms';
import { PATHS } from '../../paths';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink,
    ButtonComponent,
    FontAwesomeModule,
    FormsModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  PATHS = PATHS;
  xIcon = faXTwitter;
  fbIcon = faFacebook;
  ytIcon = faYoutube;
  dotIcon = faCircle;
  emailIcon = faEnvelope;

  subBtnCustomStyle = {
    'border-radius': '0px 6px 6px 0px',
    'font-size': '14px',
  };

  onSubscribe(email: NgModel) {
    console.log(email.value + ' has been subscribed');
  }
}
