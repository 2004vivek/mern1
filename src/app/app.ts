import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  students: any[] = [];
  page = 1;
  
  // New properties for adding a student
  newName: string = '';
  newEmail: string = '';
  newMarks: number = 0;
  showAddForm: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get(`http://localhost:8080/api/students?page=${this.page}`)
      .subscribe((data: any) => this.students = data);
  }

  nextPage() {
    this.page++;
    this.loadStudents();
  }

  prevPage() {
    if (this.page > 1) this.page--;
    this.loadStudents();
  }
  
  // New methods for adding a student
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
  
  addStudent() {
    const newStudent = {
      name: this.newName,
      email: this.newEmail,
      marks: this.newMarks
    };
    
    this.http.post('http://localhost:8080/api/students', newStudent)
      .subscribe({
        next: (response: any) => {
          console.log('Student added successfully:', response);
          // Reset form
          this.newName = '';
          this.newEmail = '';
          this.newMarks = 0;
          this.showAddForm = false;
          // Reload students to show the new one
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error adding student:', error);
          alert('Error adding student. Please try again.');
        }
      });
  }
  
  cancelAdd() {
    this.showAddForm = false;
    this.newName = '';
    this.newEmail = '';
    this.newMarks = 0;
  }
}
