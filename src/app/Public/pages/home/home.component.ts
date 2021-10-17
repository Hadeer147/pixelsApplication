import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { Music } from 'src/app/_model/music';
import { PagesComponent } from '../pages.component';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../pages.css']
})
export class HomeComponent implements OnInit {

  private limit: number =10;
  token:any = localStorage.getItem('User') ?? false;
  popular:Music[]    = [];
  newRelease:Music[] = [];
  rand:Music[]       = [];
  windowWidth:number = 0;

  constructor(public owl:PagesComponent,public read:ReadConfigService,public user:UserConfigService) { }
  
  
  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    //init the page to regular form
    $('.tb-page').removeAttr('style');

    //Render Sorting of musics: Popular
    this.read.getalltracks(this.limit,'popular').subscribe((musics: Music[]) => {
      this.popular = musics;
      setTimeout(() => {
        this.owl.loadOwl('4rowInit')
      }, 100); 
    });

    //Render Sorting of musics: New Release
    this.read.getalltracks(this.limit,'release').subscribe((musics: Music[]) => {
      this.newRelease = musics;
      setTimeout(() => {
        this.owl.loadOwl('5rowInit');
      },100);
    });

    //Render Sorting of musics: Random
    this.read.getalltracks(this.limit,'random').subscribe(async (musics: Music[]) => {
      this.rand = musics;
      setTimeout(() => {
        this.owl.loadOwl('5rowInitLooper');
      },100);
      
    });

  }
  
}
