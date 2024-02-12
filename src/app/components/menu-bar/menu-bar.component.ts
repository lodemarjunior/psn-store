import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  quantity: number = 0;
  display: boolean = false;
  
  constructor(private cart:CartService) {
    this.quantity = this.cart.items.length;
  }

  ngOnInit(): void {
    // Inscreva-se no evento para atualizações no carrinho
    this.cart.cartUpdated.subscribe(() => {
      this.quantity = this.cart.items.length;
    });
  }

  openCart(): void {
    if (this.cart.display) {
      this.cart.closeCart();
    } else {
      this.cart.openCart();
    }
  }
  
  closeCart(): void {
    this.cart.closeCart();
  }
}
