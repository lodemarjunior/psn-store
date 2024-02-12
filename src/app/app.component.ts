import { Component, ElementRef, HostListener } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';

  constructor(private cart:CartService) {
    let localData = localStorage.getItem("cart");

    if (localData) {
      let cartFromLocalStorage = JSON.parse(localData) as { id: string | null, quantity: number }[];
      this.cart.items = cartFromLocalStorage;
    }
  }
}
