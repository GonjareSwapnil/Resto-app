import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup

  constructor(private formbuilder: FormBuilder, private _http: HttpClient, private router: Router){}


  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      
      email:[''],
      password:['']
    })
  }
  // login method
  login(){
    this._http.get<any>("http://localhost:3000/signup").subscribe((res:any)=>{
     const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password  
     })
     if(user){
      alert("Login is successfull")
      this.loginForm.reset();
      this.router.navigate(['restaurent'])
     }
     else{
      alert(" User Not Found !!!")
     }
    }),
    ((err:any)=>{
      alert('Something Wrong')
    })
  }
}
