import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { PagesComponent } from '../pages.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['../pages.css']
})
export class BrowseComponent implements OnInit {
 
  constructor(public owl:PagesComponent,public read:ReadConfigService,public user:UserConfigService) { }
  bands:any;
  objKeys:any = [];

  public getBands = this.read.getallBands().subscribe(res => {
      this.bands  = res;
      this.objKeys =  Object.keys(this.bands);
      setTimeout(() => {
        this.owl.loadOwl('5rowInit')
      }, 100); 
  });

  ngOnInit(): void {
  
  }


}
