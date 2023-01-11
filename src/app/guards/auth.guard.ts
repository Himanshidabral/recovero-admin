import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_ROUTE } from '../constants/route.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private $router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const accessToken = localStorage.getItem('adminAccessToken');
      const role= localStorage.getItem('adminType');
      if(!accessToken){
        this.$router.navigateByUrl(LOGIN_ROUTE.url);
        return false;        
      }
      if (accessToken && role == route.data['roles'][0] || role == route.data['roles'][1] ) {
        return true;
      }

      this.$router.navigateByUrl(LOGIN_ROUTE.url);
      return false;
  }
  
}
