import {Component} from '@angular/core'
import { Product } from '../interfaces/product.model'



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
product: Product = {
      id: '1',
  title: 'camiseta',
  price: 800,
  description: 'camiseta unica',
  image: '../../assets/images/camiseta.png',
}
}