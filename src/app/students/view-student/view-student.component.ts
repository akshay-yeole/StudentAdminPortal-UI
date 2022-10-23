import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Gender } from 'src/app/Models/ui-models/gender.model';
import { Student } from 'src/app/Models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  genderList: Gender[] = [];
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      Id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  isNewStudent: boolean = true;
  title: string = "";

  constructor(private readonly genderService: GenderService,
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');
        if (this.studentId) {
          if (this.studentId.toLocaleLowerCase() === 'Add'.toLocaleLowerCase()) {
            this.isNewStudent = true;
            this.title = "Add New Student";
          }
          else {
            this.isNewStudent = false;
            this.title = "Edit Student";
            this.studentService.getStudent(this.studentId)
              .subscribe(
                (successResponse) => {
                  //console.log(successResponse);
                  this.student = successResponse;
                });
          }
        }
        this.genderService.getGenderList()
          .subscribe(
            (successResponse) => {
              //console.log(successResponse);
              this.genderList = successResponse;
            }
          );
      });
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student Updated Succesfully', undefined, {
            duration: 3000
          });
        }
      )
  }
  onDelete(): void {
    this.studentService.deleteStudent(this.student.id).subscribe(
      (successResponse) => {
        this.snackbar.open('Student Deleted', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      }
    );
  }
  onAdd(): void {
    this.studentService.addStudent(this.student)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student Added Succesfully', undefined, {
            duration: 3000
          });

          setTimeout(() => {
            this.router.navigateByUrl(`students${successResponse.id}`);
          }, 2000);
        }
      )
  }
}
