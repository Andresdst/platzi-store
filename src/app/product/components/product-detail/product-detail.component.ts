import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {switchMap} from 'rxjs/operators'
import { Product } from '@core/interfaces/product.model';
import { ProductsService } from '@core/services/products/products.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product!:Product //product:Product / product!:Product

  constructor(
    private route:ActivatedRoute,
    private productsService:ProductsService
    ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params:Params) => {
          return this.productsService.getProduct(params.id)
        })
      )
      .subscribe((product)=>{
        this.product = product
      })
  }

  // fetchProduct(id:string) {
  //   this.productsService.getProduct(id)
  //   .subscribe(product=>{
  //     this.product = product
  //   })
  // }

  createProduct() {
    const newProduct:Product = {
      id: '222',
      title: 'producto desde angular',
      price: 4000,
      description: 'nuevo producto desde ui',
      image: 'assets/images/stickers2.png'
    }
    this.productsService.postProduct(newProduct)
    .subscribe(product=>{
      console.log(product)
    })
  }

  updateProduct() {
    const changes:Partial<Product> = {
      title: 'actualizado desde angular',
      price: 6666,
    }
    this.productsService.updateProduct('222',changes)
    .subscribe(product=>{
      console.log(product)
    })
  }

  deleteProduct(id:string) {
    this.productsService.deleteProduct(id)
    .subscribe(res=> console.log(res))
  }

}
