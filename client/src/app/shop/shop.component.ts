import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ShopService} from "./shop.service";
import {Product} from "../shared/models/product.model";
import {Brand} from "../shared/models/brand.model";
import {Type} from "../shared/models/type.model";
import {ShopParams} from "../shared/models/shopParams.model";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    {name:'Alphabetical', value:'name'},
    {name:'Price: Low to High', value:'priceAsc'},
    {name:'Price: High to Low', value:'priceDesc'},
  ];
  totalCount = 0;
  @ViewChild('search') searchValue : ElementRef | undefined;

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.loadTypes();
    this.loadBrands();
    this.loadProducts();
    console.log(this.types);
  }

  loadProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }
    });
  }

  loadBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id:0, name:'All'},...response]
    });
  }

  loadTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id:0, name:'All'},...response]
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.loadProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.loadProducts();
  }

  onSelectedSortOption(event: any) {
    this.shopParams.sort = event.target.value;
    this.loadProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.loadProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchValue?.nativeElement.value;
    this.loadProducts();
  }

  onReset() {
    if (this.searchValue) this.searchValue.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.loadProducts();
  }
}
