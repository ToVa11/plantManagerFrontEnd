import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Authority } from 'src/app/enum/authority.enum';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-authorities',
  templateUrl: './edit-authorities.component.html',
  styleUrls: ['./edit-authorities.component.css']
})
export class EditAuthoritiesComponent implements OnInit {

  @Input() user: User;

  public authorities = Authority;
  public selectedAuthorities: any[] = [];
  
  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.user.roles.forEach(role => {
      this.selectedAuthorities[role]=true;
    });
    for(let authority in this.authorities) {
      if(this.selectedAuthorities[authority] == undefined) {
        this.selectedAuthorities[authority] = false;
      }
    }
  }

  public onUpdateAuthorities() {
    this.user.roles = [];
    for(let role in this.selectedAuthorities) {
      if(this.selectedAuthorities[role]) {
        this.user.roles.push(role);
      }
    }
    this.userService.updateAuthorities(this.user).subscribe(
      (response) => {
        this.toastr.success('Authorities updated');
        this.activeModal.close();
      }
    );
  }

  public checkboxChanged(event) {
    for(let role in this.selectedAuthorities) {
      if(role == event.value) {
        this.selectedAuthorities[role] = !this.selectedAuthorities[role];
      }
    }
  }
}
