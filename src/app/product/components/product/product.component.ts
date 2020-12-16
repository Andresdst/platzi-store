import {Component, Input, Output, EventEmitter} from '@angular/core'
import { Product } from '../../../core/interfaces/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
//Los "!" La sintaxis existe para aquellos casos comunes en los que no puede garantizar que el valor se defina inmediatamente
@Input() product!:Product;

@Output() clicked:EventEmitter<any> = new EventEmitter()

addCart(){
  this.clicked.emit(this.product.id)
  console.log('agregado')
}
}