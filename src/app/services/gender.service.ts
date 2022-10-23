import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../Models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private BaseApiUrl = "https://localhost:44389";

  constructor(private client: HttpClient) { }

  getGenderList(): Observable<Gender[]> {
    return this.client.get<Gender[]>(this.BaseApiUrl + '/genders');
  }

}
