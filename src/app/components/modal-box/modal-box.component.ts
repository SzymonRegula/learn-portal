import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [MatDialogModule, ButtonComponent, FontAwesomeModule],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss',
})
export class ModalBoxComponent {
  closeIcon = faXmark;
}
