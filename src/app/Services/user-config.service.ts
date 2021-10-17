import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from '../_model/user';


@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  protected $user:{} = [];
  constructor(protected http:HttpClient) { }
  private username:any;
  private email:any;
  getUser(): Observable<user> {
    let sanctum = localStorage.getItem('User');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`
    });
     return this.http.post<user>('http://localhost:8000/api/snip',null,{headers: headers});
  }
  user() {
    this.getUser().subscribe((res: user) => {
      this.username = res.name;
      this.email    = res.email;
      return {
         name: this.username,
         email: this.email
      }
    });
  }
}
