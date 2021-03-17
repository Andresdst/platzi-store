import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';


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
    .pipe(
      catchError(this.handleError),
    )
  }

  getProduct(id:string){
    return this.http.get<Product>(`${environment.url_api}/products/${id}`)
    .pipe(
      catchError(this.handleError),
    )
  }

  postProduct(product:Product){
    return this.http.post(`${environment.url_api}/products/`, product)
    .pipe(
      catchError(this.handleError),
    )
  }

  updateProduct(id:string,changes:Partial<Product>){ //Partial<Product> = metodo en typescript para definir parte de producto
    return this.http.put(`${environment.url_api}/products/${id}`,changes)
    .pipe(
      catchError(this.handleError),
    )
  }

  deleteProduct(id:string){
    return this.http.delete(`${environment.url_api}/products/${id}`)
    .pipe(
      catchError(this.handleError),
    )
  }

  getRandomUsers(): Observable<User[]>{
    return this.http.get('https://randomuser.me/api/?results=2')
    .pipe(

      retry(3), //operator retry para peticiones http
      //en caso de error utiliza el catchError, en caso de que sea exitoso no pasa por el catch
      catchError(this.handleError),
      //cast limpiamos data de la resp
      map((response: any) => response.results as User[])
    );
  }

  getFile(){
    return this.http.get('assets/files/test.txt',{responseType: 'text'}) //o ruta externa
  }

  //metodo para trackear errores
  private handleError(error:HttpErrorResponse) {
    console.log(error)
    return throwError('ups algo salio mal')
  }
}
