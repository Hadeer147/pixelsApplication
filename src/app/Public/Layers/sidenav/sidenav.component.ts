import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WriteService } from 'src/app/Services/write.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private write:WriteService,private router:Router) { }
  token:any = localStorage.getItem('User') ?? null;
  playlistID:number = 35;
  playlistToken = JSON.parse(localStorage.getItem('playingType')|| '{}');
  playlistActive = false;
  loginUser = (this.token !== null) ? true : false;

  logout() {
    localStorage.removeItem('User');
    window.location.reload()
  }

  playDirectory() {
   this.write.playingMode.subscribe((res)=>{
      if(res !== null)
         console.log(res);
         if(res.playlist !== null) {
          this.playlistActive = true;
          alert('here');
          this.router.navigate([`playlist/${res.playlist}`]);
         } else {
            this.playlistActive = false;
         }
     
   })
  }

  darkMode() {
   
  }
  ngOnInit(): void { 
    this.playlistActive = this.write.playlistActive;
    this.write.playingMode.subscribe((res) =>{
      console.log(res);
    });
    $('.menu-key').on('click',function(){
       $('aside').toggleClass('close');
    });
    
    function close() 
    {
      if(window.innerWidth < 781) {
         $('aside').addClass('close');
      } else {
        $('aside').removeClass('close')
      }
    }
    $(window).on('resize',function(){
       close();
    });
    close();
    function darkMode() 
    {
      if(localStorage.getItem('mode') == 'light') {
        document.body.classList.add('light-theme');
        $('.logo img').attr('src','/assets/images/logo.png');
        document.documentElement.style.setProperty('--colorWhite', '#000');
        document.documentElement.style.setProperty('--black', '#fff');
        document.documentElement.style.setProperty('--dark-gray', '#ccc');
        document.documentElement.style.setProperty('--sliver', '#333');
        document.documentElement.style.setProperty('--borderColor', '#00000017');
        document.documentElement.style.setProperty('--dark-sliver', '#ccc');

     } else {
       document.body.classList.remove('light-theme')
       $('.logo img').attr('src','/assets/images/logo.white.png');
       document.documentElement.style.setProperty('--colorWhite', '#fff');
       document.documentElement.style.setProperty('--black', '#101316');
       document.documentElement.style.setProperty('--dark-gray', '#202326');
       document.documentElement.style.setProperty('--sliver', '#ccc');
       document.documentElement.style.setProperty('--borderColor', '#dee2e617');
       document.documentElement.style.setProperty('--dark-sliver', '#15181b');

     }   
    }

    darkMode();
   
    console.log(localStorage.getItem('mode') );
    let inverted = document.querySelectorAll('img');
    console.log(inverted);
  
    $('.switch').on('change',function(){
      // console.log(document.body.classList.contains('light-theme'));
      (document.body.classList.contains('light-theme')) ? document.body.classList.remove('light-theme') : document.body.classList.add('light-theme');
      let mode = (document.body.classList.contains('light-theme')) ? localStorage.setItem('mode','light') : localStorage.setItem('mode','dark');
      darkMode(); 
    })
  }


}
