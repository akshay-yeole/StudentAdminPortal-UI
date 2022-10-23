import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/api-models/student.model';
import { StudentAddRequest } from '../Models/api-models/studentaddrequest.model';
import { StudentUpdateRequest } from '../Models/api-models/studentupdaterequest.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private BaseApiUrl = "https://localhost:44389";

  constructor(private client: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.client.get<Student[]>(this.BaseApiUrl + '/Students');
  }

  getStudent(studentId: string): Observable<Student> {
    return this.client.get<Student>(this.BaseApiUrl + '/Students/' + studentId);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const studentUpdateRequest: StudentUpdateRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
      dateOfBirth: studentRequest.dateOfBirth
    }

    return this.client.put<Student>(this.BaseApiUrl + '/students/' + studentId, studentUpdateRequest);
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.client.delete<Student>(this.BaseApiUrl + '/students/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const studentaddRequest: StudentAddRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
      dateOfBirth: studentRequest.dateOfBirth
    }
    return this.client.post<Student>(this.BaseApiUrl + '/students/add', studentaddRequest);
  }
}
