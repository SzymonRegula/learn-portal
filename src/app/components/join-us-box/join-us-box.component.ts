import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-join-us-box',
  standalone: true,
  imports: [ButtonComponent, RouterLink, CapitalizeFirstPipe],
  templateUrl: './join-us-box.component.html',
  styleUrl: './join-us-box.component.scss',
})
export class JoinUsBoxComponent implements OnInit {
  @Input() role: Role = 'student';
  @Input() description: string = '';
  imageSrc = 'assets/join-us-student.jpeg';

  ngOnInit(): void {
    if (this.role === 'trainer') {
      this.imageSrc = 'assets/join-us-trainer.png';
    }
  }
}
