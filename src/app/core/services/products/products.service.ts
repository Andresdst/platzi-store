import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../interfaces/product.model';

import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(`${environment.url_api}/products/`)
  }

  getProduct(id:string){
    return this.http.get<Product>(`${environment.url_api}/products/${id}`)
  }

  postProduct(product:Product){
    return this.http.post(`${environment.url_api}/products/`, product)
  }

  updateProduct(id:string,changes:Partial<Product>){ //Partial<Product> = metodo en typescript para definir parte de producto
    return this.http.put(`${environment.url_api}/products/${id}`,changes)
  }

  deleteProduct(id:string){
    return this.http.delete(`${environment.url_api}/products/${id}`)
  }
}
