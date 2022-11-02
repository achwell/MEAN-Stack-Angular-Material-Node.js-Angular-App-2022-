import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitted = false;
  authError = false;
  isAdmin = false

  constructor(private formBuilder: FormBuilder,
              private authService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required]
    })

  }

  onSubmit() {
    const email = this.signupForm.get("email").value
    const password = this.signupForm.get("password").value
    this.isSubmitted = true;
    this.authService.signup(email, password, this.isAdmin)
      .subscribe(
        (user) => this.router.navigate(['/users/login']),
        (error => this.authError = error)
      )

  }

}
