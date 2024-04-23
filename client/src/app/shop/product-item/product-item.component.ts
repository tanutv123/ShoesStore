import {Component, Input} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {Basket} from "../../shared/models/basket.model";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product | undefined;

  constructor(private basketService: BasketService) {
  }

  addItemToBasket() {
    if (this.product)
      this.basketService.addItemToBasket(this.product);
  }
}
