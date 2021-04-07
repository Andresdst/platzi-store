import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import {TokenService} from './services/token.service'
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private tokenService:TokenService
  ) { }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    request = this.addToken(request)
    return next.handle(request)//reques modificado
  }

  private addToken(request:HttpRequest<any>){
    const token = this.tokenService.getToken()
    if(token){
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
