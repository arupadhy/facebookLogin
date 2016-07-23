import { Component, OnInit } from '@angular/core';
declare var FB: any;

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  private login: boolean = false;
  title = 'app works!';
  private loggedInUser:string;

  public ngOnInit() {
    this.login = window.localStorage.getItem("connected") ? true : false;
  }
  public facebookLogin() {
    let ref: any = this;
    FB.login(function (response) {
      if (response.status === 'connected') {
        console.log(response);
        window.localStorage.setItem('connected', 'true');
        ref.loggedInUser = response.id;
        ref.fetchUserInfo();
         ref.login = true;
        document.getElementById('status').innerHTML = "connected to FB";
      } else if (response.status === 'not_authorized') {
        window.localStorage.clear();
        document.getElementById('status').innerHTML = "Not authrized by fb...not logged in";
        ref.login = false;
      }
    });
  }

  private fetchUserInfo() {
    let ref:any = this; 
    FB.api('/me', { fields: 'name,email,work' }, function (response) {  
      console.log(response);
      ref.loggedInUser = response.name;
      console.log('loggedinUser set now');
    });
    //this.loggedInUser = "Neha";
  }
}
