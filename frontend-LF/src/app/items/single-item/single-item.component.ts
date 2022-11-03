import {Component, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsService} from "../../services/items.service";
import {Cart, CartItem} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  item!: Item

  constructor(private route: ActivatedRoute,
              private itemService: ItemsService,
              private cartService: CartService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }

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
    const cartItem: CartItem = {
      _id: this.item._id,
      item: this.item,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
    this._snackBar.open("You added " + cartItem.item.name + " to the cart", "OK", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 4000
    })
  }
}
