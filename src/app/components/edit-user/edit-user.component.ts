import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public onEditUser() {
    this.userService.editUser(this.user).subscribe(
      (response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        this.toastr.success('Profile updated');
        this.activeModal.close();
      }
    )
  }
}
