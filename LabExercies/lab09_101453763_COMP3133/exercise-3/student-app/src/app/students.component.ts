import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'students',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ getTitle() }} - {{ getCurrentDate() }}</h2>
    <ul>
      <li *ngFor="let student of students">{{ student }}</li>
    </ul>
  `
})
export class StudentsComponent { 
  title = 'My List of Students';
  students: string[] = ['Alice', 'Bob', 'Charlie', 'David'];

  public getTitle(): string {
    return this.title;
  }

  public getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
