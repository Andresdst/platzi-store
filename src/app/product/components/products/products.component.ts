import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/interfaces/product.model';
import { ProductsService } from '../../../core/services/products/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService:ProductsService
  ) { }

  ngOnInit(): void {
  }

  clickProduct(id:number){
  console.log('clickeado ',id)
  }

  products:Product[] = this.productsService.getAllProducts()
}
