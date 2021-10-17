import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { user } from 'src/app/_model/user';
import{SettingService} from './../../../Services/setting.service';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css']
})
export class SettingProfileComponent implements OnInit {

  userGet: user = {
    email: '',
    name: ''
  };
  err:any;
  token:any = localStorage.getItem('User') ?? null;


  constructor(private userset:UserConfigService, private settingService:SettingService,private notifyService : NotificationService) { }
  


  ngOnInit(): void {
    if(this.token == null) window.location.href = '/';
    this.userset.getUser().subscribe((res: user)=>{
      this.userGet = res;
      console.log(res);
   });
  }

  changeUserData(form: any){
    console.log(form.value);
    let data: any = {
      'name': form.value
    };
    this.settingService.editUserData(data)
    
        .subscribe(res => {
         
          console.log(res);
          this.notifyService.showSuccess('userData has been updated successfully','Success')
        
        }, err => {
          console.error(err);
        });
  }
  changeUserEmail(form: any){
    console.log(form.value);
    let data: any = {
      'email': form.value
    };
   

    this.settingService.editUserData(data)
    
        .subscribe(res => {

          console.log(res);
          if(res.message=='success'){
            this.notifyService.showSuccess('userData has been updated successfully','Success')

          }
          this.err=res.validFailsMessage

        
        }, err => {
          console.error(err);
        });
  }


  changePassword(form: any): void {
    let data: any =  {
      'oldpassword': form.oldpassword.value,
      'password':form.password.value,
      'password_confirmation':form.password_confirmation.value
      
    };
    console.log(form.oldpassword.value);
    this.settingService.changeCurrentPassword(data)
        .subscribe(res => {
          console.log(res);
          if(res.message=='password has been changed'){
            this.notifyService.showSuccess('userData has been updated successfully','Success');
          }else{
            this.notifyService.showError(res.message,'Error');
          }
          
          

        }, err => {
          console.error(err);
        });
  }

}
