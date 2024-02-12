import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input()
  id: string = "";
  @Input()
  gameCover: string = "";
  @Input()
  gameLabel: string = "";
  @Input()
  gameType: string = "";
  @Input()
  gamePrice: string = "";

  constructor(private cart:CartService) {
  }

  closeCart(): void {
    this.cart.closeCart();
  }
}
