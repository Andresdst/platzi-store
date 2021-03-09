import {Component, Input, Output, EventEmitter} from '@angular/core'
import { Product } from '@core/interfaces/product.model'
import { CartService } from '@core/services/cart.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  //Los "!" La sintaxis existe para aquellos casos comunes en los que no puede garantizar que el valor se defina inmediatamente
  @Input() product!:Product;
  @Output() clicked:EventEmitter<any> = new EventEmitter()

  constructor(private cartService:CartService){}

  addCart(){
    this.clicked.emit(this.product.id)
    console.log('agregado al carrito')
    this.cartService.addCart(this.product)
  }
}