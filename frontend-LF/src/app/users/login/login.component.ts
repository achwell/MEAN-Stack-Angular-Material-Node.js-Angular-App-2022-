import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  authError = false;

  constructor(private formBuilder: FormBuilder, private authService: UserService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required, Validators.email],
      password:["", Validators.required]
    })
  }

  onSubmit() {
    const email = this.loginForm.get("email").value
    const password = this.loginForm.get("password").value
    this.isSubmitted = true;
    this.authService.login(email,password)
      .subscribe(
        (user:{token:string, user:string,isAdmin:boolean}) => this.localStorageService.setToken(user.token),
        (error => this.authError = error)
      )
  }
}
