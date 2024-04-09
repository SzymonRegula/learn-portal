import { Component } from '@angular/core';
import { BoxComponent } from '../../components/box/box.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  boxes = [
    {
      imageSrc: 'assets/box1.jpg',
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Occaecat  Volup',
      date: new Date(),
      time: 20,
    },
  ];
}
