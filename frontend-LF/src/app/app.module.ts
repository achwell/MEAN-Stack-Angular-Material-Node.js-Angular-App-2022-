import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
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
import { ItemsListAdminComponent } from './items/items-list-admin/items-list-admin.component';
import { ItemDialogComponent } from './dialogs/item-dialog/item-dialog.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import {TextFieldModule} from "@angular/cdk/text-field";
import { SingleItemComponent } from './items/single-item/single-item.component';

const material = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
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
      {path: "items/form", component: ItemFormComponent},
      {path: "items/form/:id", component: ItemFormComponent},
      {path: "items/single-item/:id", component: SingleItemComponent},
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
    SingleItemComponent
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
  providers: [SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
