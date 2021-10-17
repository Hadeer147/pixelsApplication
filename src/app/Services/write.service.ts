import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { playlistData } from '../_model/playlist-data';


@Injectable({
  providedIn: 'root'
})
export class WriteService { 
  public playlist: BehaviorSubject<any>           = new BehaviorSubject<any>(null);
  public playCounterActive: BehaviorSubject<any>  = new BehaviorSubject<any>(null);
  public deleteFromList: BehaviorSubject<any>     = new BehaviorSubject<any>(null);
  public playlistDisplayImg: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public playlistPayload: BehaviorSubject<any>    = new BehaviorSubject<any>(null);
  public loadedMusic: BehaviorSubject<any>        = new BehaviorSubject<any>(null);
  public playingMode: BehaviorSubject<any>        = new BehaviorSubject<any>(null);  
  public playlistActive:boolean     = false;  

  constructor(private http:HttpClient) { }


}
