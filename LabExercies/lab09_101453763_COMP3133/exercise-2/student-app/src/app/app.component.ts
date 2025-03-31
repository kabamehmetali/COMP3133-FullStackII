import { Component } from '@angular/core';

import { StudentsComponent } from './students.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentsComponent], // register the StudentsComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-app';
}
