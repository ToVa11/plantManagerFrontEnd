import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { HeaderType } from '../enum/headerType.enum';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  public userLoggedIn: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.isUserLoggedIn();
  }

  public onLogin(user: User) {
    this.subscriptions.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token);
          this.authService.addUserToLocalStorage(response.body);
          this.router.navigateByUrl('');
          this.showLoading = false;
          this.userLoggedIn = true;
          document.getElementById('dropdownLoginMenu').click();
          this.toastr.success(`Welcome, ${response.body.username}`);
        },
        (error: HttpErrorResponse) => {
          this.toastr.error('Something went wrong.', 'Error');
          this.showLoading = false;
          this.authService.clearUserAndTokenFromLocalStorage();
          this.userLoggedIn = false;
        }
      )
    );
  }

  public onLogout() {
    this.authService.clearUserAndTokenFromLocalStorage();
    this.userLoggedIn = false;
  }

}
