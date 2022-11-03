import {Injectable} from '@angular/core';
import {Cart, CartItem} from "../models/cart";
import {BehaviorSubject} from "rxjs";

const CART = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart())

  constructor() {
    this.initialCartLocalStorage();
  }

  initialCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initialCart = JSON.stringify({
        cartItems: [],
        user: {}
      })
      localStorage.setItem(CART, initialCart)
    }
  }

  getCart() {
    const cartJsonString: string = localStorage.getItem(CART);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem) {
    const cart = this.getCart();
    const cartItemExists = cart.cartItems.find(item => item.item._id === cartItem.item._id);
    if(cartItemExists) {
      cart.cartItems.map(item => {
        if(item.item._id === cartItem.item._id) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      })
    } else {
      const user = localStorage.getItem("user");
      cart.cartItems.push(cartItem);
      cart.user = user;
      this.cart$.next(cart);
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  removeItem(index:number) {
    const cart = this.getCart();
    cart.cartItems.splice(index, 1)
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART, cartJson);
    this.cart$.next(cart);
  }
}
