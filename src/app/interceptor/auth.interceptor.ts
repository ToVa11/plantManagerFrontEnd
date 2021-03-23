import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
    if(httpRequest.url.includes(`${this.authService.host}/auth/login`)) {
      return handler.handle(httpRequest);
    }    
    if(httpRequest.url.includes(`${this.authService.host}/family/list`)) {
      return handler.handle(httpRequest);
    }
    
    this.authService.loadToken();
    const token = this.authService.getToken();
    const request = httpRequest.clone({setHeaders: { Authorization : `Bearer ${token}`}});
    
    return handler.handle(request)
  }
}
