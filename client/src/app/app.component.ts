import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./shared/models/product.model";
import {Pagination} from "./shared/models/pagination.model";
import {BasketService} from "./basket/basket.service";
import {AccountService} from "./account/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Shoes Store';

  constructor(private basketService: BasketService,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.loadBasket();
    this.loadCurrenUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) this.basketService.getBasket(basketId);
  }

  loadCurrenUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}
