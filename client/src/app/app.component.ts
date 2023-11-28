import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./shared/models/product.model";
import {Pagination} from "./shared/models/pagination.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Shoes Store';

  constructor() {
  }

  ngOnInit() {
  }
}
