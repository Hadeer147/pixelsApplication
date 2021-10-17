import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { user } from 'src/app/_model/user';
import { MusicService } from './music.service';
import { Music } from 'src/app/_model/music';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  baseURL = "http://127.0.0.1:8000/api/musics/";
  public searchQuery: string = "";
  activeSearch:boolean = false;
  musics: Music[] = [];
  allSearch: any = [];
  searchResActive:boolean = true;
  isShown: boolean = false;
  windowWidth:number = 0;
  constructor(private http: HttpClient, private musicService: MusicService, private userset: UserConfigService) {}
  userGet: any = [];

  windowResize() {
    this.windowWidth = window.innerWidth;
  }

  searchToggler() {
    this.activeSearch = (this.activeSearch == false) ? true : false;
  }



  ngOnInit(): void {

    this.windowResize();

    let resize = () => {
      this.windowResize();
      console.log(this.windowWidth);
    }

    let sResult = (e:boolean) => {
      this.isShown = e;
    }

    $(window).on('resize',function(){
       resize();
    });

    $('nav form').on('click',function(e){
       sResult(true);
    });

    $(document).on('click',() => {
       this.searchResActive = false;
       sResult(false);
       console.log(this.searchResActive);
    })

    $(window).on('resize',function(){
       if(window.innerWidth  > 1100) {
        $('nav form').removeClass('active');
       }
    });
    this.userset.getUser().subscribe((res: user) => {
      this.userGet = res;
    });
    console.log(this.userset.user());
    this.getAllSearch();
  }
  getAllSearch() {
    if(this.searchQuery.length > 1) {
      this.musicService.getAllSearch(this.searchQuery).subscribe((res: any) => {
        this.allSearch = res;
        this.isShown = true;
        console.log(res);
      });
    }
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }

  }


