import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {  Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    constructor(private http: HttpClient) {
    }
     sanctum = localStorage.getItem('User');
     headers = new HttpHeaders({
      Authorization: `Bearer ${this.sanctum}`,
      Accept: 'application/json'
  });

    editUserData(dataDto: any): Observable<any> {
        console.log(dataDto);
        return this.http.post<any>('http://localhost:8000/api/user', dataDto, {
            headers: this.headers
        });
        
    }

    changeCurrentPassword(dataDto: any): Observable<any> {
        return this.http.post<any>('http://localhost:8000/api/password/reset', dataDto, {
            headers: this.headers
        });
    }

}
