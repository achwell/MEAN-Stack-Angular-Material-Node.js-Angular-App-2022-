import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";

import {AppComponent} from './app.component';
import {HeaderComponent} from './Shared/header/header.component';
import {FooterComponent} from './Shared/footer/footer.component';
import {GroundZeroComponent} from './Shared/ground-zero/ground-zero.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {CategoryDialogComponent} from './dialogs/category-dialog/category-dialog.component';
import {CategoryFormComponent} from './category/category-form/category-form.component';
import {ItemsListComponent} from './items/items-list/items-list.component';
import {SearchPipe} from "./Pipes/SearchPipe";
import {ItemsListAdminComponent} from './items/items-list-admin/items-list-admin.component';
import {ItemDialogComponent} from './dialogs/item-dialog/item-dialog.component';
import {ItemFormComponent} from './items/item-form/item-form.component';
import {TextFieldModule} from "@angular/cdk/text-field";
import {SingleItemComponent} from './items/single-item/single-item.component';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {InterInterceptor} from "./services/inter.interceptor";
import {GuardService} from "./services/guard.service";
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const material = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  TextFieldModule
]

const routes: Routes = [
  {
    path: "", component: GroundZeroComponent,
    children: [
      {path: "categories/list", component: CategoryListComponent},
      {path: "categories/form", component: CategoryFormComponent},
      {path: "categories/form/:id", component: CategoryFormComponent},

      {path: "", component: ItemsListComponent},
      {path: "items/list", component: ItemsListAdminComponent},
      {path: "items/form", component: ItemFormComponent, canActivate: [GuardService]},
      {path: "items/form/:id", component: ItemFormComponent, canActivate: [GuardService]},
      {path: "items/single-item/:id", component: SingleItemComponent, canActivate: [GuardService]},

      {path: "users/login", component: LoginComponent},
      {path: "users/signup", component: RegisterComponent},
      {path: "users/list", component: UsersListComponent},
      {path: "users/form", component: UserFormComponent},
      {path: "users/form/:id", component: UserFormComponent},
    ]
  }

]

@NgModule({
  declarations: [
    AppComponent,
    CategoryDialogComponent,
    CategoryFormComponent,
    CategoryListComponent,
    FooterComponent,
    GroundZeroComponent,
    HeaderComponent,
    ItemsListComponent,
    SearchPipe,
    ItemsListAdminComponent,
    ItemDialogComponent,
    ItemFormComponent,
    SingleItemComponent,
    LoginComponent,
    RegisterComponent,
    UsersListComponent,
    UserDialogComponent,
    UserFormComponent
  ],
  imports: [
    ...material,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SearchPipe, {provide: HTTP_INTERCEPTORS, useClass: InterInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
