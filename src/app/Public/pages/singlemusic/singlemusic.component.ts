import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-singlemusic',
  templateUrl: './singlemusic.component.html',
  styleUrls: ['./singlemusic.component.css']
})
export class SinglemusicComponent implements OnInit {
  data:any;

  constructor(private http:HttpClient , private route:ActivatedRoute , private router:Router) {


   }

  ngOnInit(): void {

   this.route.params.subscribe(res => {
     this.http.get(`http://localhost:8000/api/show/${res.id}`).subscribe((res:any) =>{
     this.data=res.music;
     console.log(this.data) 
    
     },(error)=>{
      this.router.navigate(['notfound']);
     })
   })

  }

}
