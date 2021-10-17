import {
  Component,
  OnInit
} from '@angular/core';
import {
  LikeService
} from 'src/app/Services/like.service';
import {
  ReadConfigService
} from 'src/app/Services/read-config.service';
import {
  UserConfigService
} from 'src/app/Services/user-config.service';
import {
  LikeInterface
} from 'src/app/_model/like';
import {
  Music
} from 'src/app/_model/music';
import { user } from 'src/app/_model/user';
import {
  PagesComponent
} from '../pages.component';
declare var $: any;



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../pages.css','profile.component.css']
})
export class ProfileComponent implements OnInit {
  private limit: number = 10;
  //Popular
  PopularSlides: any = this.read.Popular;
  NewSlides: any = this.read.New;
  alltrackes: any[] = [];
  likes: any[] = [];
  userGet:any;
  playlist:any;
  playlistKeys:string[] = [];

  constructor(
    public owl: PagesComponent,
    public read: ReadConfigService,
    public user: UserConfigService,
    private likeService: LikeService,
    private userset:UserConfigService) {}

  gettrackeByID(id: number): void {
    this.read.gettrackeByID(id).subscribe((res: {
      message: string,
      music: Music
    }) => {
      console.log(res);
      if (res.message === 'success') {
        this.read.musictrack.next([
          res.music.src,
          res.music.name,
          res.music.band,
          res.music.img,
          res.music.id
        ]);
      }
    }, error => {
      console.error(error);
    });
  }
  getAllMusicLikes(): void {
    this.likeService.songLikes().subscribe((res: LikeInterface) => {
      console.log('profile', res);
      this.likes = res.likes;
      setTimeout(() => {
        this.owl.loadOwl('4rowInit');
        this.owl.loadOwl('5rowInit');
      }, 10);
    });
  }

  ngOnInit(): void {
    $('.tb-page').removeAttr('style');
    this.read.getPlaylist().subscribe(data => {
       this.playlist     = data[0];
       this.playlistKeys = Object.keys(this.playlist);
       console.log(this.playlist);
    });

    this.likeService.likes.subscribe(data => {

      if (data) {
        if (data?.action === true) {
          this.getAllMusicLikes();
        }

      }

    })

    this.read.getalltracks(this.limit).subscribe((musics: Music[]) => {
      this.alltrackes = musics;
    });
    this.getAllMusicLikes();
  }







}
