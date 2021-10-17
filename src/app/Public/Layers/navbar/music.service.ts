import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music } from 'src/app/_model/music';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MusicService {
  baseURL="http://127.0.0.1:8000/api/musics" ;
  httpClient: any;
  musics: Music[] = [];

  constructor(private http:HttpClient) { }
  getAllSearch(searchQuery:string='') {
   let data = {
      'searchQuery': searchQuery
   }
   return this.http.post(`${this.baseURL}/${searchQuery}`,data);
  }
 
  
}
