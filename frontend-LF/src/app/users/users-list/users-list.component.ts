import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {UserDialogComponent} from "../../dialogs/user-dialog/user-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  displayColumns: string[] = ["email", "passwordHash", "isAdmin", "edit", "delete"]

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  deleteModal(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "250px",
      data: {name: user.email}
    });
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result) {
        this.userService.deleteUser(user._id).subscribe(user => this.getAllUsers())
      }
    })
  }
}
