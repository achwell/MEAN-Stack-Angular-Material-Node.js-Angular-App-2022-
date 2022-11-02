import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  isSubmitted: boolean = false;
  editMode = false;
  currentUserId!: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      isAdmin: [""]
    })
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      this.currentUserId = params["id"];
      if (this.currentUserId) {
        this.editMode = true;
        this.userService.getOneUsers(this.currentUserId).subscribe(user => {
          this.userForm.get("email").setValue(user.email);
          this.userForm.get("password").setValue(user.password);
          this.userForm.get("isAdmin").setValue(user.isAdmin);
        })
      }
    })
  }

  addUser(user: User) {
    this.userService.createUser(user).subscribe(user => {
      this._snackBar.open("You created a new user: " + user.email, "OK", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 4000
      })
    })
  }

  updateUser(user: User, userId: string) {
    this.userService.updateUser(user, userId).subscribe(user => {
      this._snackBar.open("You updated user: " + user.email, "OK", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 4000
      })
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.userForm.invalid) {
      return;
    }
    const user:User = {
      _id: this.currentUserId,
      email: this.userForm.get("email").value,
      password: this.userForm.get("password").value,
      isAdmin: !!this.userForm.get("isAdmin").value
    }

    if (this.editMode) {
      this.updateUser(user, this.currentUserId);
    } else {
      this.addUser(user);
    }
    this.userService.getAllUsers();
    setTimeout(() => {
      this.router.navigate(["/users/list"]);
    }, 2000)
  }
}
