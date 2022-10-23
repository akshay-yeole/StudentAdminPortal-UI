import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../Models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  allStudents: Student[] = [];
  displayedColumns = ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'gender', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  constructor(private studentservice: StudentService) { }

  ngOnInit(): void {
    //Fetch Students
    this.studentservice.getAllStudents().subscribe(
      (successResponse) => {
        console.log(successResponse[0].firstName);
        this.allStudents = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.allStudents);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
