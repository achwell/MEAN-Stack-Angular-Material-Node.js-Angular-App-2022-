import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoryDialogComponent} from "../../dialogs/category-dialog/category-dialog.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories!: Category[]
  displayColumns: string[] = ["name", "categoryType", "edit", "delete"];

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  onDeleteCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent,
      {
        width: "250px",
        data: {name: category.name}}
    );
    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result) {
        this.categoryService.deleteCategory(category._id).subscribe(_ => this.getCategories())
      }
    })
  }


}
