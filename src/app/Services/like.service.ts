import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LikeInterface } from '../_model/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  public likes: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private sanctum = localStorage.getItem('User');
  private headers = new HttpHeaders({
      Authorization: `Bearer ${this.sanctum}`
    });

  constructor(private http: HttpClient) { }


  toggleLike(songId: number): Observable<{ isLike: boolean }> {
    return this.http.post<{ isLike: boolean }>(`http://localhost:8000/api/user/like/${songId}`, null, {
      headers: this.headers
    });
  }

  songLikes(): Observable<LikeInterface> {
    return this.http.get<LikeInterface>(`http://localhost:8000/api/user/likes`, {
      headers: this.headers
    });
  }

  isLike(songId: number): Observable<{ isLike: boolean }> {
    return this.http.get<{ isLike: boolean }>(`http://localhost:8000/api/user/isLike/${songId}`, {
      headers: this.headers
    });
  }

  
}
