import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Product } from '../../interfaces/product.model';

import { environment } from '../../../../environments/environment'
//interface de ejemplo
interface User {
  email: string,
  gender: string,
  phone: string
}

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

  getRandomUsers(): Observable<User[]>{
    return this.http.get('https://randomuser.me/api/?results=2')
    .pipe(
      //cast limpiamos data de la resp
      map((response: any) => response.results as User[])
    );
  }
}
