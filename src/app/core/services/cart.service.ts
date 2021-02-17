import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Product } from './../interfaces/product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products:Product[] = []
  private cart = new BehaviorSubject<Product[]>([])

  cart$ = this.cart.asObservable() //variable tipo observable

  constructor() { }

  addCart(product:Product){
    //para no tener problemas de mutabilidad se crea una nueva referencia del arreglo
    this.products = [...this.products,product]

    //notificar a todos los componentes el cambio del observable cart
    this.cart.next(this.products)
  }
}
