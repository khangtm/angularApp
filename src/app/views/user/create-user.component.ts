import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AlertService, UserService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: 'create-user.component.html',
})
export class CreateUserComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit(){
    this.registerModel = {
      username : '',
      password : '',
      status: 'Active',
      role: '3',
      address: ''   
    };
  }

  loading = false;
  message : String;
  registerModel: any = {};
  alertMessage: any = {};

  //Create user
  saveData() {
    this.loading = true;
    console.log(this.registerModel);

    this.userService.register(this.registerModel).pipe(first())
    .subscribe(
      data => {
        console.log(data);
        let result:any = data
        if(result.success){
          this.loading = false;
          this.modalRef.hide();
          // this.alertService.success(result.data);
        }else{
          this.alertMessage = {  type: 'danger',  msg: result.data }
          this.loading = false;
          return
        }
      },
      error => {
        this.alertMessage = {  type: 'danger',  msg: error}
        this.loading = false;
        return
    });
  }
}
