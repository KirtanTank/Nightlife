import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  su_username : any;
  su_email : any;
  su_password : any;
  lg_email : any;
  lg_password : any;

  loginObj : any = {
    lgObj_email: undefined,
    lgObj_password : undefined
  }

  signupObj : any = {
    suObj_username: undefined,
    suObj_email: undefined,
    suObj_password : undefined
  }

  login(){
    if(this.lg_email || this.lg_password != ''){
    this.loginObj.lgObj_email = this.lg_email;
    this.loginObj.lgObj_password = this.lg_password;
    console.log(this.loginObj.lgObj_email + '\n' + this.loginObj.lgObj_password);
    this.lg_email = '';
    this.lg_password = '';
    this.loginObj.lgObj_email = undefined;
    this.loginObj.lgObj_password = undefined;
    console.log(this.loginObj.lgObj_email + '\n' + this.loginObj.lgObj_password);
    }
    else{
      console.log('nologin');
    }
  }

  signup(){
    if(this.su_email || this.su_password || this.su_username != ''){
      this.signupObj.suObj_username = this.su_username;
      this.signupObj.suObj_email = this.su_email;
      this.signupObj.suObj_password = this.su_password;
      console.log(this.signupObj.suObj_username + '\n' + this.signupObj.suObj_email + '\n' + this.signupObj.suObj_password);
      this.su_username = '';
      this.su_email = '';
      this.su_password = '';  
      this.signupObj.suObj_username = undefined;
      this.signupObj.suObj_email = undefined;
      this.signupObj.suObj_password = undefined;
      console.log(this.signupObj.suObj_username + '\n' + this.signupObj.suObj_email + '\n' + this.signupObj.suObj_password);  
      }
    else{
        console.log('nosignup');
    }  
  }

  constructor() { 
  }

  ngOnInit(): void {
  }

}
