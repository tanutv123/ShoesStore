import { Component } from '@angular/core';
import {BasketService} from "./basket.service";
import {BasketItem} from "../shared/models/basket.model";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService: BasketService) {
  }

  incrementQuantity(item : BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(id: number, quantity = 1) {
    this.basketService.removeItemFromBasket(id, quantity);
  }
}
