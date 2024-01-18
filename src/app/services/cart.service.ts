import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: {id: string | null, quantity: number}[] = [];
  cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
}
