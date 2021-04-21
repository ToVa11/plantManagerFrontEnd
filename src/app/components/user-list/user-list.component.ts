import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { EditAuthoritiesComponent } from '../edit-authorities/edit-authorities.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response) => this.users = response
      )
    );
  }

  public openAuthoritiesModal(user: User) {
    const modal = this.modalService.open(EditAuthoritiesComponent);
    modal.componentInstance.user = user;
  }
}
