import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { HeaderType } from '../enum/headerType.enum';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Plant } from '../model/plant';
import { Family } from '../model/family';
import { UpdatePlantComponent } from '../components/update-plant/update-plant.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { OwnlistService } from '../service/ownlist.service';
import { WishlistService } from '../service/wishlist.service';
import { NgForm } from '@angular/forms';

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
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ownlistService: OwnlistService,
    private wishlistService: WishlistService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.userLoggedIn = this.authService.isUserLoggedIn();
  }

  public onLogin(loginForm: NgForm) {
    this.subscriptions.push(
      this.authService.login(loginForm.value).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token);
          this.authService.addUserToLocalStorage(response.body);
          this.router.navigateByUrl('');
          this.showLoading = false;
          this.userLoggedIn = true;
          document.getElementById('dropdownLoginMenu').click();
          this.toastr.success(`Welcome, ${response.body.username}`);
          this.subscriptions.push(
            this.ownlistService.getOwnlist().subscribe(
              (response) => {
                this.ownlistService.updateOwnlistObservable(response.plantIds);
              }
            )
          );
          this.subscriptions.push(
            this.wishlistService.getWishlist().subscribe(
              (response) => {
                this.wishlistService.updateWishlistObservable(response.plantIds);
              }
            )
          );
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
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.router.navigateByUrl("");
  }


  public openPlantModal() {
    const modalRef = this.modalService.open(UpdatePlantComponent);
    modalRef.componentInstance.plant = new Plant(0, '', '', '', false, null, new Family(0, '', []));
    modalRef.componentInstance.family = new Family(0, '', []);
  }

  public openEditUserModal() {
    const modalRef = this.modalService.open(EditUserComponent);
    modalRef.componentInstance.user = JSON.parse(localStorage.getItem('loggedInUser'));
  }

}

