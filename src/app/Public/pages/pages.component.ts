import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { Music } from 'src/app/_model/music';
declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {
  constructor(public read:ReadConfigService) { }
  loadOwl(req:string) {
    if(req == '4rowInit') {
      $(".owl-carousel.fourOwl").owlCarousel({
        margin:23,
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
        responsive:{
            0:{
                items:2
            },
            576: {
                items:2
            },
            992:{
                items:3
            },
            1300:{
                items:4
            }
        }
    });
    } else if(req == '5rowInit') {
      $(".owl-carousel.fiveOwl").owlCarousel({
        margin:23,
        lazyLoad: true,
        loop: false,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
        responsive:{
            0:{
                items:2
            },
            576: {
                items:2
            },
            840:{
                items:3
            },
            1100:{
                items:4
            },
            1300:{
                items:5
            }
        }
    });
    } else if(req == '5rowInitLooper') {
      $(".owl-carousel.fiveOwlLooper").owlCarousel({
        margin:23,
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
        responsive:{
            0:{
                items:2
            },
            576: {
                items:2
            },
            790:{
                items:3
            },
            1000:{
                items:4
            },
            1300:{
                items:5
            }
        }
    });
    }
  }
  gettrackeByID(id:number):void{
    this.read.gettrackeByID(id).subscribe((res:{message:string,music:Music})=>{
      if(res.message==='success'){
        this.read.musictrack.next([
          res.music.src,
          res.music.name,
          res.music.band,
          res.music.img,
          res.music.id
        ]);
      }
      console.log(res);
      
      
    }, error => {
      console.error(error);
    });
  }
  ngOnInit(): void {
    let playFn = (id:any) => {
       this.gettrackeByID(id);
    }
    $('.tb-page').on('click','.play',function(this:any){
        let id:any = $(this).attr('id');
        $('.play').not($(this)).children('i').removeClass('fa-pause').addClass('fa-play')
        $(this).children('i').toggleClass('fa-play fa-pause');
        localStorage.setItem('playingType',JSON.stringify({'playingType':'music'}))
        playFn(id);
    });  
  }


}
