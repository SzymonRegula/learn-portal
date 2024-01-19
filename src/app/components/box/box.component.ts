import { Component, Input } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CustomDatePipe],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent {
  @Input() imageSrc = '';
  @Input() tag = '';
  @Input() title = '';
  @Input() date: Date = new Date();
  @Input() time = 0;
}
