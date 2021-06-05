import { Component, OnInit } from '@angular/core';
import {SignUpForm} from "../../model/SignUpForm";
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('',[
      Validators.required,
      Validators.email
  ])
  hide = true;
  status = 'Please Register in the form!'
  form: any = {};
  signUpForm: SignUpForm;
  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }
  test = '{ "myString": "string", "myNumber": 4 }'
  test2: any = [{"authority": "ADMIN"}]
roles: any = [];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.signUpForm = new SignUpForm(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password
    )
    this.authService.signUp(this.signUpForm).subscribe(data =>{
      console.log('data == ',data)
      this.test2.push("admin")

      this.test2.forEach(role =>{
        console.log("role ==== ",role.authority)
        this.roles.push(role.authority)
        console.log('roles ---->', this.roles)
        console.log(JSON.parse(this.roles))
      })
      console.log('test = ', JSON.parse(this.test))
      if(JSON.stringify(data)==JSON.stringify(this.test2)){
        this.status = 'The name is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again with another email!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create account success ->'
      }
    })
  }
}
