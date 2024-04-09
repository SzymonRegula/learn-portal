import { Component } from '@angular/core';
import { JoinUsBoxComponent } from '../../components/join-us-box/join-us-box.component';

@Component({
  selector: 'app-join-us-page',
  standalone: true,
  imports: [JoinUsBoxComponent],
  templateUrl: './join-us-page.component.html',
  styleUrl: './join-us-page.component.scss',
})
export class JoinUsPageComponent {
  studentDescription =
    'Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.';
  trainerDescription =
    'Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.';
}
