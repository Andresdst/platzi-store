import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    request = this.addToken(request)
    return next.handle(request)//reques modificado


  }

  private addToken(request:HttpRequest<any>){
    const token = "123"
    if(true){
      //clonar request y setearle una nueva propiedad
      request = request.clone({
        setHeaders:{
          token
        }
      })
      return request
    }
    return request

  }

}
