import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import routes from 'src/app/app-routing.module';
import { WriteService } from 'src/app/Services/write.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']

})
export class PlayingComponent implements OnInit {
  getPlaylistAction(index:number = 0) {
    let data = {
      'playingType': 'music',
    }
    localStorage.setItem('playingType',JSON.stringify(data));
    this.transferePlaylist(this.musicInRow,index);
  }

  //delete item from payload
  removeFromPayload(musicID:number) {
    this.write.deleteFromList.next({musicID});
  }

  transferePlaylist(playlist:any,playCounter:number = 0) {
    this.write.playingMode.next({mode:'music',playlist: null});
    this.write.playlist.next({playlist,playCounter});
  }
  constructor(private write:WriteService,private router:Router) { }
  name:string = 'Not Set';
  img:string  = "../../../../assets/images/noimg.jfif";
  band:string = 'Not Set';
  musicInRow:any;
  playlistArray:[] = [];
  playJson:any = [];
  playListCount:number = 0;
  
  ngOnInit(): void {
     //init the page in playlist
     $('.tb-page').css({
      'margin': 0,
      'padding': 0,
      'max-width': '100%',
      'width': '100%',
      'margin-top': 0
    });

    this.write.playlistPayload.subscribe((res)=>{
      this.write.playingMode.subscribe(res =>{
          console.log(res);
         (res.mode == 'music') ??  this.router.navigate(['notfound']);
      });
      this.musicInRow = res;
      this.playListCount = this.musicInRow.length;
      this.playJson = []; // -> to prevent double push and repeting the items
      this.musicInRow.forEach((element:any) => {
         let chunk = {
            'src' : element[0],
            'name': element[1],
            'band': element[2],
            'img' : element[3],
            'id'  : element[4]
         }

         this.playJson.push(chunk);
         this.name = this.playJson[0]['name'];
         this.img  = this.playJson[0]['img'];
         this.band = this.playJson[0]['band'];
         
      });
 
    });
    this.write.loadedMusic.subscribe((res)=>{
       this.name = res[1];
       this.img  = res[3];
       this.band = res[2];
    })
  }

}
