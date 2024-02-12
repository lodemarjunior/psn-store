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

  addLocalStorage(newItem: {id: string | null, quantity: number}): void {   
    let localData = localStorage.getItem("cart");
    
    if (localData) {
      let achou: boolean = false;
      let cartFromLocalStorage = JSON.parse(localData) as { id: string | null, quantity: number }[];

      cartFromLocalStorage.forEach((e: { id: string | null, quantity: number }) => {
        if (e.id == newItem.id) {
          e.quantity = newItem.quantity;
          achou = true;
        }
      });

      if (!achou) {
        cartFromLocalStorage.push(newItem);
      }
      
      // Atualiza o localStorage com o carrinho atualizado
      localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
    } else {
      localStorage.setItem("cart", JSON.stringify([newItem]));
    }
  }
}
