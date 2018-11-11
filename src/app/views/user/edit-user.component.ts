import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertService, UserService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: 'edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit(){
    console.log(this.userInfo)
    this.editModel = {
      id: this.userInfo.id,
      username : this.userInfo.username,
      password : this.userInfo.password,
      status: this.userInfo.status,
      role: this.userInfo.role.id.toString(),
      address: this.userInfo.address.address,
      modifydate: this.userInfo.modifydate
    };
  }

  loading = false;
  userInfo : any;
  editModel: any = {};

  //Register user
  edit() {

    this.loading = true;
    console.log(this.editModel);

    this.userService.update(this.editModel).pipe(first())
    .subscribe(
      data => {
        console.log(data);
        let result:any = data
        if(result.success){
          this.loading = false;
          this.modalRef.hide();
          this.alertService.success(result.data);
        }else{
          this.alertService.error('Error');
          this.loading = false;
          return
        }
      },
      error => {
        this.alertService.error(error);
    });
  }
}
