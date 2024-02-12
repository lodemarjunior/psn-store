import { Component, OnInit } from '@angular/core';
import { dataFake } from '../../data/dataFake';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: string | null = "";
  foto: string = "";
  title: string = "";
  description: string = "";
  quantity: number = 0;

  constructor(private route:ActivatedRoute, private cart:CartService) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(element => {    
      let id = element.get("id");
      
      this.id = id;

      const result = dataFake.filter(article => article.id == id)[0];

      this.foto = result.gameCover;
      this.title = result.title;
      this.description = result.gameDescription;
    });
  }

  add(): void {
    this.quantity++;
  }

  decrease(): void {
    if (this.quantity>0) {
      this.quantity--;
    }
  }

  addCart(id: string | null, quantity: number): void {
    const newItem = {id: id, quantity: quantity};
    let achou: boolean = false;

    this.cart.items.forEach(e => {
      if (e.id == newItem.id) {
        e.quantity = newItem.quantity;
        achou = true;
      }
    });
    
    if (!achou) {
      this.cart.items.push(newItem);
    }

    this.cart.addLocalStorage(newItem);
    this.cart.cartUpdated.emit();
  }
}
