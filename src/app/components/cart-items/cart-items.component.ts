import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { dataFake } from 'src/app/data/dataFake';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  items: {id: string | null, quantity: number}[] = [];
  gameData: any[] = dataFake; // Adiciona o array de dados
  display: boolean = false;

  constructor(private cart:CartService, private elRef: ElementRef) {
    this.items = this.cart.items;
  }
  
  ngOnInit(): void {
    // Inscreva-se no evento para atualizações no carrinho
    this.cart.cartUpdated.subscribe(() => {
      this.items = this.cart.items;
      this.display = this.cart.display;
    });
  }

  getItemData(id: string | null): any | undefined {
    // Função que retorna os dados do item correspondente ao ID
    return this.gameData.find(item => item.id === id);
  }

  // Ouvinte de evento de clique no documento
  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    console.log("this.display == "+this.display);
    console.log("targetElement.id.includes(mainCart) == "+targetElement.id.includes("mainCart"));

    if (!this.elRef.nativeElement.contains(event.target) && !targetElement.id.includes("mainCart")) {
      this.closeCart();
    }
  }

  closeCart(): void {
    this.cart.closeCart();
  }
}
