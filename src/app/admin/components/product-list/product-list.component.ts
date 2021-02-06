import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.model';

import { ProductsService } from '../../../core/services/products/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  products: Product[] = []

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.fetchProducts()
  }

  fetchProducts() {
    this.productsService.getAllProducts()
      .subscribe(products => this.products = products)
  }

  deleteProduct(id:string) {
    this.productsService.deleteProduct(id)
    .subscribe(res=> {
      this.products= this.products.filter(product => product.id != id)
    })
  }

}
