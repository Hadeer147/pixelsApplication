import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { PagesComponent } from '../pages.component';

@Component({
  selector: 'app-newrelease',
  templateUrl: './newrelease.component.html',
  styleUrls: ['../pages.css']
})
export class NewreleaseComponent implements OnInit {

  constructor(public owl:PagesComponent,public read:ReadConfigService) { }
  
  category:any;

  ngOnInit(): void {
    $('.tb-page').removeAttr('style');
    this.read.getallcategory().subscribe(res => {
        this.category = res;
        setTimeout(() => {
          this.owl.loadOwl('5rowInit')
        }, 100); 
    })
  }

}
