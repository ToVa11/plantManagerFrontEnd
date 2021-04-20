import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.css']
})
export class UpdateUserProfileComponent implements OnInit, OnDestroy {

  public loggedInUser: User;
  public repeatPassword: string;
  public imageResizing: boolean=false;
  public passwordsMatch: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private imageService: Ng2ImgMaxService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  onProfileImageChange(file: File) {
    this.imageResizing = true;

    this.subscriptions.push(
      this.imageService.resizeImage(file, 150, 200).subscribe(
        result => {
          if (result.size > 1000000) {
            this.imageService.compressImage(result, 10000).subscribe(
              compressed => {
                this.userService.updateProfileImage(compressed, this.loggedInUser.username).subscribe(
                  (response) => {
                    this.handleUploadResponse(response);
                  }
                )
              }
            )
          }
          else {
            this.userService.updateProfileImage(result, this.loggedInUser.username).subscribe(
              (response) => {
                this.handleUploadResponse(response);
              }
            )
          }
          this.imageResizing = false;
        },
        error => {
          console.log('😢 Oh no!', error);
          this.imageResizing = false;
        }
      )
    );
  }

  private handleUploadResponse(response: User) {    
    localStorage.setItem('loggedInUser', JSON.stringify(response));
    // Set date timestamp after image url to avoid showing cached image
    response.profileImageUrl = response.profileImageUrl+'?'+new Date().toISOString().slice(0, 16);
    this.loggedInUser = response;
  }

  public onUpdateUser() {
    this.userService.editUser(this.loggedInUser).subscribe(
      (response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        this.loggedInUser=response;
        this.toastr.success('Profile updated');
      }
    )
  }

  public onRepeatPasswordChange() {
    this.passwordsMatch = this.comparePasswords();
  }

  private comparePasswords() {
    return this.loggedInUser.password === this.repeatPassword;
  }
}
