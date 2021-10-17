import { Component } from '@angular/core';
import { UserConfigService } from './Services/user-config.service';
import { NotificationService } from './Services/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pixelsApp';
  title1 = 'toaster-not';
  constructor(private user:UserConfigService,private notifyService : NotificationService){

  }
  ngOnInit(): void {
    //  this.user.snipToken();
    //  console.log(this.user.getUser())
  }
//   showToasterSuccess(){
//     this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
// }

// showToasterError(){
//     this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
// }

// showToasterInfo(){
//     this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
// }

// showToasterWarning(){
//     this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
// }
}
