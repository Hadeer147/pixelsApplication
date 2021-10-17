import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { WriteService } from 'src/app/Services/write.service';
import { playlist } from 'src/app/_model/playlist';



@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  constructor(private read:ReadConfigService,private http:HttpClient,private write:WriteService) {}

  playlists:any = [];
  playlistsKey:any;
  failCreate:string = '';

  onClick(event: any): void {
        event.stopPropagation();
  }

  /*
         Playlist Fetch
    ==========================
    data: playlist belong to the current user
  */

  playlistFetch() {
    this.read.getPlaylist().subscribe((res:playlist[])=>{
      this.playlists = res[0];
      this.playlistsKey = Object.keys(this.playlists);
    });
  }

  getMusicData(id:number) {
    this.http.get(`http://127.0.0.1:8000/api/show/${id}`,{}).subscribe((res:any)=>{
       console.log(res);
       return res['music']
    });
  }

  playlistAdd(playlist:number,id:any) {
    let sanctum = localStorage.getItem('User');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
    }); 
    this.http.post(`http://127.0.0.1:8000/api/playlist/add?playlistID=${playlist}&musicID=${id}`,{},{headers: headers}).subscribe((res)=>{
      this.playlistFetch();
    });
  }
  
  playlistRemove(playlist:number,ele:HTMLElement){
    let accept = confirm('Are you sure that you want to delete this playlist');
    let sanctum = localStorage.getItem('User');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
    });

    if(accept) {
      this.http.delete(`http://127.0.0.1:8000/api/playlist/delete/${playlist}`,{headers:headers}).subscribe((res)=>{
        ele.remove();
      });
    }
  }

  playlistCreateAdd(form: NgForm,id:any) {
    let data = {
      'name': form.value.playlist,
      'id': id
  }

    let sanctum = localStorage.getItem('User');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
    });

    this.http.post(`http://127.0.0.1:8000/api/playlist/create`,data,{headers: headers}).subscribe((res:any)=>{
       if(res['message'] == 'fail') {
          this.failCreate = res['validFailsMessage']['name'][0];
       } else {
        this.failCreate = '';
        this.playlistFetch();
       }
    });

  }

  /*
         Show Existance 
     =======================
     data: show if song exist in playlist
  */
 
  showExistance(playlist:number,id:string) {
      let result = this.playlists[playlist].musics.find((e:any)=> e.id == id);
      return (result !== undefined) ? false : true;
  }


  ngOnInit(): void {
   this.playlistFetch();
    //display overlay

    $('.tb-page').on('click', '.menu', function () {
      let id:any = $(this).attr('id');
      $(".overlay").css('display', 'flex');
      setTimeout(() => {
        $('.overlay').addClass('active');
        $('.overlay .model').addClass('active');
        $('.overlay .idHolder').each(function(){
           $(this).attr('id',id);
        })
      }, 10);
    });

    //hide overlay

    $('.overlay').on('click', function (event:Event) {
      event.cancelBubble = true;
      $('.overlay').removeClass('active');
      $('.overlay .model').removeClass('active');
      setTimeout(() => {
        $(".overlay").css('display', 'none');
      }, 1000);
    });

  }

}
