import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product: Product | undefined;
  constructor(private shopService: ShopService,
              private route: ActivatedRoute,
              private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: response => {
          this.product = response;
          this.bcService.set('@productDetails', response.name);
        }
      })
    }
  }

}
