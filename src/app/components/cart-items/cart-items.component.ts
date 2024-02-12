import { Component, OnInit } from '@angular/core';
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

  constructor(private cart:CartService) {
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
  
  closeCart(): void {
    this.cart.closeCart();
  }

  add(id: string | null): void {
    let newItem: {id: string | null, quantity: number} = { id: null, quantity: 0 };

    this.cart.items.find(e => {
      if (e.id === id) {
        e.quantity += 1;
        newItem = {id: id, quantity: e.quantity};
      }
    });

    this.cart.addLocalStorage(newItem);
    this.cart.cartUpdated.emit();
  }

  decrease(id: string | null): void {
    let newItem: {id: string | null, quantity: number} = { id: null, quantity: 0 };

    for (let i=0; i<this.cart.items.length; i++) {
      const e = this.cart.items[i];

      if (e.id === id) {
        e.quantity -= 1;

        if (e.quantity === 0) {
          if (this.removeItem(id)) {
            break;
          } else {
            e.quantity += 1;
            break;
          }
        } else {
          newItem = {id: id, quantity: e.quantity};
          this.cart.addLocalStorage(newItem);
          this.cart.cartUpdated.emit();
          break; // Sai do loop assim que o item for encontrado
        }
      }
    }
  }

  removeItem(id: string | null): boolean {
    if (confirm("Deseja realmente excluir este item do carrinho?")) {
      let cartItems = localStorage.getItem('cart');

      for (let i=0; i<this.cart.items.length; i++) {
        const e = this.cart.items[i];
  
        if (e.id === id) { 
          this.cart.items.splice(i, 1);
          break;
        }
      }
        
      if (cartItems) {
        let items: { id: string, quantity: number }[] = JSON.parse(cartItems);
    
        // Encontre o item com o ID correspondente
        const itemToRemove = items.find(item => item.id === id);
    
        if (itemToRemove) {
          // Se o item for encontrado, você pode removê-lo do array
          const index = items.indexOf(itemToRemove);

          if (index !== -1) {
            items.splice(index, 1);
          }
        }
    
        // Atualize o localStorage com o novo array de itens
        localStorage.setItem('cart', JSON.stringify(items));
      }

      this.cart.cartUpdated.emit();

      return true;
    }

    return false;
  }
}
