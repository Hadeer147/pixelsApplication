import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { WriteService } from 'src/app/Services/write.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(public read:ReadConfigService,private route:ActivatedRoute,private router:Router,private activeRouter:ActivatedRoute,private http:HttpClient,public write:WriteService) {
    
  }
  
  selectedId: number = 0;
  
  id:any;

  playlistData:any = {
    'musics': [
      {img:'',id: 0}

    ]
  };

  playlistArray:[] = [];

  playlistMusicCount:any;

  playingPlaylist:boolean = false;

  playlistPage:boolean = true;

  playlistID:number    = 0;

  jsonStatus = JSON.parse(localStorage.getItem('playingType') || '{}');

  playlistDisplayImg:any = "../../../../assets/images/noimg.jfif";

  activeItem:any;

  activePlaylist = JSON.parse(localStorage.getItem('playingType') || '{}').id;

  activeSong:any;
  
  //load playlist 
  getPlaylistAction(index:number = 0) {

    let data = {
      'playingType': 'playlist',
      'id'         :  this.id
    }
    localStorage.setItem('playingType',JSON.stringify(data));
    this.transferePlaylist(this.playlistArray,index);
    this.getActiveList();
  }

  //add the playlist to the payload in music components 
  transferePlaylist(playlist:any,playCounter:number = 0) {
    let playing = this.playlistData.id;
    this.write.playlistActive = true;
    console.log(this.write.playlistActive);
    this.write.playCounterActive.subscribe((res)=>{
      this.activeSong = res;
      console.log(res)
      this.addActiveForce(res,playing); 
    })
    this.write.playingMode.next({mode:'playlist',playlist:playing});
    this.write.playlist.next({playing,playlist,playCounter});
  }
  
  //get the image and the name of active song
  getActiveList() {
    this.write.playlistDisplayImg.subscribe((res) => {
       this.playlistDisplayImg = res;
    });
  }

  //change the return playlist from database from json to array
  playlistFormate(playlistInsert:any) {
    let playArray:any = [];
    let playlist:any  = playlistInsert[0];
    this.playlistID   = playlist[0].id;
    this.playlistData = playlist[0];
    this.playlistMusicCount = this.playlistData.musics.length;
    this.playlistDisplayImg = this.playlistData.musics[0].img ?? '';
    this.playlistData.musics.forEach((element:any) => {
        let chunk = [element.src,element.name,element.band,element.img,element.id]
        playArray.push(chunk);
        this.playlistArray = playArray;
    });
    // this.addActiveForce( this.activeSong);
  }

  //delete item from payload
  removeFromPayload(musicID:number,playlistID:number) {
    this.write.deleteFromList.next({musicID,playlistID});
  }

  //delete the relation between music and playlist in database
  removeRelationMusicPlaylist(id:any,div:HTMLElement) {
    let playlist = this.playlistID;
    let sanctum  = localStorage.getItem('User');
    let headers  = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
    }); 
    this.http.post(`http://127.0.0.1:8000/api/playlist/add?playlistID=${playlist}&musicID=${id}`,{},{headers: headers}).subscribe((res)=>{
      div.remove();
      this.playlistMusicCount = this.playlistMusicCount - 1;
    });
  };

  addActiveForce(num:number,workingPlaylist:number) {
     if(workingPlaylist == this.activePlaylist) {
      $('.song-list.active').removeClass('active');
      $('.song-list').eq(num).addClass('active');
     }
  }

  ngOnInit(): void {    
    //init the page in playlist
    if(this.playlistPage) {
      $('.tb-page').css({
        'margin': 0,
        'padding': 0,
        'max-width': '100%',
        'width': '100%',
        'margin-top': 0
      });
    }
    this.route.params.subscribe(params => {  
      this.id = params['id'];
      console.log(this.id);
      if(!isNaN(this.id) && this.id > 0) {
        if( this.id == this.jsonStatus.id) {
        }
        this.router.events.pipe(
          filter((event) => event instanceof NavigationEnd)
        ).subscribe(x => {
           this.getActiveList();
        })

        this.read.getPlaylistMusics(this.id).subscribe(res => {
          let data:any = res[0];
          if(data[0] == undefined) {
            this.router.navigateByUrl('notfound');
          } else {
            this.playlistFormate(res); 
          }
        });

      } else if(this.id == 0){
        this.write.playlistPayload.subscribe((res)=>{
          this.playlistData = res;
          this.playlistMusicCount = this.playlistData.length;
        });
      } else {
        this.router.navigateByUrl('notfound');
      }
     
    });

  }

}
