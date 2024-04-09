import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-my-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-students.component.html',
  styleUrl: './my-students.component.scss',
})
export class MyStudentsComponent {
  private studentsService = inject(StudentsService);
  myStudents$ = this.studentsService.myStudents$;
}
