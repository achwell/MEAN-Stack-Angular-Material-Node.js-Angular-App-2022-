import {Component, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {Category} from "../../models/category";
import {ItemsService} from "../../services/items.service";
import {CategoryService} from "../../services/category.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchPipe} from "../../Pipes/SearchPipe";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items!: Item[]
  categories!: Category[]
  filter!: string
  showList = true
  searchLaunch = false
  searchForm!: FormGroup;
  searchDataFiltered!: Item[]

  constructor(private itemService: ItemsService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private searchPipe: SearchPipe) {
  }

  ngOnInit(): void {
    this.getItems()
    this.getCategories()
    this.searchForm = this.formBuilder.group({
      term: ""
    })
  }

  getItems() {
    this.itemService.getAllItems().subscribe(items => this.items = items)
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }

  changeClient(value: string) {
    this.searchLaunch = false;
    this.filter = value;
    this.showList = this.filter === "All";
  }

  onSubmit() {
    this.searchLaunch = true;
    const term = this.searchForm.get('term')?.value;
    this.searchDataFiltered = this.searchPipe.transform(this.items, term);
  }
}
