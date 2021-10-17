import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Music } from '../_model/music';
import { playlist } from '../_model/playlist';
import { NumberValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { playlistData } from '../_model/playlist-data';

@Injectable({
  providedIn: 'root'
})
export class ReadConfigService {

  public musictrack: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  Popular:Object = [
    {id: 1, name:'Hey Boy', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-49.png"},
    {id: 2, name:'Natural', band:'Imagine the dragon', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-45.png"},
    {id: 3, name:'Diamound', band:'Rihanna', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-44.png"},
    {id: 4, name:'Bring me to life', band:'Evenscence', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-43.png"},
    {id: 5, name:'Helium ', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-42.png"},
    {id: 6, name:'Move your body', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-24.png"},
  ];
  New:Object = [
    {id: 1, name:'Hey Boy', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-50.png"},
    {id: 2, name:'Natural', band:'Imagine the dragon', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-46.png"},
    {id: 3, name:'Diamound', band:'Rihanna', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-45.png"},
    {id: 4, name:'Bring me to life', band:'Evenscence', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-42.png"},
    {id: 5, name:'Helium ', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-41.png"},
    {id: 6, name:'Move your body', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-21.png"},
  ];
  
  private Url='http://127.0.0.1:8000/api/';
  constructor(private http:HttpClient) {}
  
  getAllLists() {
    let sanctum = localStorage.getItem('User');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`
    });
    return this.http.post<playlist[]>(this.Url + 'playlist/show/',null,{headers: headers});
  }

  getPlaylist():Observable<playlist[]> {
    let sanctum = localStorage.getItem('User');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
  });
    return this.http.post<playlist[]>(this.Url + 'playlist/show',null,{headers: headers});
  }

  getPlaylistMusics(id:any):Observable<playlistData[]> {
    let sanctum = localStorage.getItem('User');
    const headers = new HttpHeaders({
        Authorization: `Bearer ${sanctum}`,
        Accept: 'application/json'
    });
    let data = {
      'id': id
    }
      return  this.http.post<playlistData[]>('http://127.0.0.1:8000/api/playlist/getplaylist',data,{headers: headers});
  }

  getalltracks(limit: number,order: string = 'popular'): Observable<Music[]> {
    return this.http.get<Music[]>(this.Url + `category/getorder/${order}/${limit}`);
  }

  getallBands(): Observable<Music[]> {
    return this.http.get<Music[]>(this.Url + `category/getbyband`);
  }

  // get track by id
  gettrackeByID(id:number): Observable<{message:string,music:Music}> {
    return this.http.get<{message:string,music:Music}>(`${this.Url}show/${id}`);
  }

  getallcategory():  Observable<{message:string,music:Music}> {
    return this.http.get<{message:string,music:Music}>(`${this.Url}category/getcategory`);
  }
}
