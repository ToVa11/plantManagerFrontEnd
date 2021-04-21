import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  
  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {};

  canActivate(): boolean {
    if(this.authService.isUserLoggedIn() && this.authService.isUserSuperAdmin()) {
      return true;
    }
    this.router.navigateByUrl("/");
    this.toastr.error('You are not authorized!');
    return false;
  }
  
}
