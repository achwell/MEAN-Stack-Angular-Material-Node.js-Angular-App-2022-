import { Component, OnInit } from '@angular/core';
import {CART, CartService} from "../../services/cart.service";
import {Cart} from "../../models/cart";
import {USER, USER_ADMIN} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartCount = 0;
  userIsAdmin:boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.cartItems.length ?? 0
    })
  }

  ngDoCheck() {
    this.userIsAdmin = JSON.parse(localStorage.getItem(USER_ADMIN));
  }

  getLoggedStatus() {
    return !!localStorage.getItem(USER);

  }

  logout() {
    const initialCart = JSON.stringify({
      cartItems: [],
      user: {}
    })
    localStorage.setItem(CART, initialCart);
    const cart: Cart = JSON.parse(localStorage.getItem(CART));
    this.cartService.cart$.next(cart);
    localStorage.removeItem(USER);
    localStorage.setItem(USER_ADMIN, JSON.stringify(false));
  }

}
