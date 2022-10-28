import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsService} from "../../services/items.service";

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  item!:Item

  constructor(private route: ActivatedRoute,
              private itemService: ItemsService,
              private router:Router) { }

  ngOnInit(): void {
    this.getOneItem();
  }

  getOneItem() {
    this.route.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        this.itemService.getOneItem(id).subscribe(item => this.item = item)
      }
    })
  }

  backToShop() {
    this.router.navigateByUrl("/");
  }

  addToCart(item: Item) {

  }
}
