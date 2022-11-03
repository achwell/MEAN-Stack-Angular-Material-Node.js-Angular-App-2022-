import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {ItemsService} from "../../services/items.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemDetailed: CartItem[] = [];
  respCart: Cart;
  totalPrice: number = 0;

  constructor(private cartService: CartService,
              private itemService: ItemsService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails() {
    this.cartService.cart$.pipe().subscribe(cart => {
      this.cartItemDetailed = [];
      this.respCart = cart;
      cart.cartItems.forEach(cartItem => {
        this.itemService.getOneItem(cartItem.item._id).subscribe(item => {
          this.totalPrice = item.price * cartItem.quantity;
          this.cartItemDetailed.push({
            _id: cartItem._id,
            item,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  removeItem(index: number, cartItem: CartItem) {
    this.cartService.removeItem(index);
    this._snackBar.open("You deleted " + cartItem.item.name + " from the cart", "OK", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000
    })
  }
}
