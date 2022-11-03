import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ItemsService} from "../../services/items.service";
import {Item} from "../../models/item";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  itemForm!: FormGroup;
  isSubmitted: boolean = false;
  categories!: Category[];
  imageDisplay!: string | ArrayBuffer;
  editMode: boolean = false;
  currentItemId!: string;

  constructor(
    private itemService: ItemsService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      image: [''],
      category: ['', Validators.required],
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }

  onImageUpload(event: any) {
    const file = event.target?.files[0];
    if (file) {
      this.itemForm.patchValue({image: file})
      this.itemForm.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as ArrayBuffer;
      };
      fileReader.readAsDataURL(file);
    }
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.editMode = true;
        this.currentItemId = id;
        this.itemService.getOneItem(id).subscribe(item => {
          this.itemForm.get('name')?.setValue(item.name)
          this.itemForm.get('description')?.setValue(item.description)
          this.itemForm.get('price')?.setValue(item.price)
          this.imageDisplay = item.image
          this.itemForm.get('category')?.setValue(item.category)
        })
      }
    })
  }

  addItem(item: FormData) {
    this.itemService.createItem(item).subscribe(item => {
      this._snackBar.open("You added " + this.itemForm.get("name")?.value + " as new Item", "OK", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 4000
      })
    })
  }

  updateItem(item: FormData) {
    this.itemService.updateItem(this.currentItemId, item).subscribe(item => {
      this._snackBar.open("You updated " + this.itemForm.get("name")?.value, "OK", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 4000
      })
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.itemForm.invalid) {
      return;
    }
    const itemData = new FormData();
    itemData.append("name", this.itemForm.get("name")?.value)
    itemData.append("description", this.itemForm.get("description")?.value)
    itemData.append("price", this.itemForm.get("price")?.value)
    itemData.append("image", this.itemForm.get("image")?.value)
    itemData.append("category", this.itemForm.get("category")?.value)

    if (this.editMode) {
      this.updateItem(itemData)
    } else {
      this.addItem(itemData)
    }

    this.itemService.getAllItems();
    setTimeout(() => {
      this.router.navigate(['/items/list'])
    }, 2000)
  }
}
