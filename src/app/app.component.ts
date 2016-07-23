import { Component, OnInit,NgZone } from '@angular/core';
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
  private imageUrl:string;
  private publicInfo:any;
  private timelineFeeds:any;

  constructor(private _ngZone:NgZone) {

    if(window.localStorage.getItem('image')) {
      this.imageUrl = window.localStorage.getItem('image');
    }

  }



  public ngOnInit() {
    let ref:any = this;
    this.login = window.localStorage.getItem("connected") ? true : false;
    this.loggedInUser = this.login?null:"Login";

    // FB.Event.subscribe('auth.login', function (response) {
    //         console.log("event auth.login subscription called..");
    //         console.log(response);
    //         FB.api('/me', function(response) {
    //                  ref.loggedInUser = response.name;
    //                  console.log('Good to see you, ' + response.name + '.');
    //                });
    //     });
  }

  public getFbPicture(id) {
    FB.api("/"+id+"/picture",resp => {
      console.log(resp);
        this._ngZone.run(() => {
          this.imageUrl = resp.data.url;
          window.localStorage.setItem('image',this.imageUrl);
        });
      console.log(this.imageUrl);
    });
  }

  public fbLogin() {
    let ref:any = this;
          FB.login(function(response) {
              if (response.authResponse) {
                  ref.login = true;
                   console.log('Welcome!  Fetching your information.... ');

                   ref._ngZone.runOutsideAngular(() => {
                         FB.api('/me', function(response) {
                           console.log(response);
                           window.localStorage.setItem('id',response.id);
                           ref.getFbPicture((response.id));

                           // ref._ngZone.run(() => {
                           //   ref.loggedInUser = null;
                           // })
                        //ref.loggedInUser = response.name;
                        console.log('Good to see you, ' + response.name + '.');
                      });
                   });
                    
              } else {
                   console.log('User cancelled login or did not fully authorize.');
              }
          });
  }


  public getFacebookPublicInfo() {
    FB.api('/me?fields=name,email,about,bio,work,location,gender',(resp) => {
        this._ngZone.run(() => {
          this.publicInfo = resp;
        });
    });
  }

  public getFacebookTimeLineInfo() {
     FB.api(window.localStorage.getItem('id')+'/feed',(resp) => {
        this._ngZone.run(() => {
          this.timelineFeeds = resp.data;
        });
    });
  }

  public facebookLogin() {
    let ref: any = this;
    FB.login(resp => {
      if(resp.status === 'connected') {
        ref.loggedInUser = "dummy Name set inside api call";
        setTimeout(function() {
            FB.api('/me', { fields: 'name,email,work' }, function (response) {  
            console.log(response);
            ref.loggedInUser = "dummy Name set inside api call";
            console.log('loggedinUser set now');
          });
        },1000);
      }
    });
    // FB.login(function (response) {
    //   if (response.status === 'connected') {
    //     console.log(response);
    //     window.localStorage.setItem('connected', 'true');
    //     ref.loggedInUser = response.id;
    //     ref.fetchUserInfo();
    //      ref.login = true;
    //     document.getElementById('status').innerHTML = "connected to FB";
    //   } else if (response.status === 'not_authorized') {
    //     window.localStorage.clear();
    //     document.getElementById('status').innerHTML = "Not authrized by fb...not logged in";
    //     ref.login = false;
    //   }
    // });
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
