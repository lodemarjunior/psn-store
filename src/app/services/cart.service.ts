import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: {id: string | null, quantity: number}[] = [];
  cartUpdated: EventEmitter<void> = new EventEmitter<void>();
  display: boolean = false;

  constructor() { }

  closeCart() {
    this.display = false;
    this.cartUpdated.emit();
  }

  openCart() {
    this.display = true;
    this.cartUpdated.emit();
  }
}
