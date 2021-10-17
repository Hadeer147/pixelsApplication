import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserConfigService } from 'src/app/Services/user-config.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private userData:UserConfigService) { }
  validation:any = {
    'name': '',
    'email': '',
    'password': ''
  };
 
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    let data = {
      'email': form.value.email,
      'name': form.value.name,
      'password': form.value.password,
      'password_confirmation': form.value.password_confirmation
    }
    this.http.post('http://127.0.0.1:8000/api/register',data).subscribe((res:any)=>{
        if(res.message == 'success') {
            localStorage.setItem('User',res.token);
            this.router.navigate(['/']);
        } else {
            this.validation['name']     = res.validation[1] ?? '';
            this.validation['email']    = res.validation[0] ?? '';
            this.validation['password'] = res.validation[2] ?? '';
        }
    },(err)=>{
        console.log(err);
    });
  }

}

