import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './core/services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasUser()
    //se utiliza un pipe para transformar el observable mediante el metodo map
    .pipe(
      //el metodo tap es una intersepcion de lectura entre un flujo de datos. no transforma ni opera, solo lee o imprime
      tap(user=> console.log(user)),

      //si es falso retorna a home, si es true navega a admin
      map(user=> user=== null? this.router.parseUrl('/') : true)
    );
  }
  
}
