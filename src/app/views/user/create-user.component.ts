import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AlertService } from '../../services';

@Component({
  templateUrl: 'create-user.component.html',
})
export class CreateUserComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef,
    private alertService: AlertService
  ) { }

  ngOnInit(){
    this.registerModel = {
      registername : '',
      hostname : '',
      servicename: '',
      port: '',
      username: '',
      password: '',
      privilegeradio: 'privilege-default',
      description: ''       
    };
  }

  loading = false;
  message : String;
  registerModel: any = {};

  //Create user
  create() {
    this.loading = true;
    console.log(this.registerModel);
    this.loading = false;
    this.modalRef.hide();
    this.message = "Create successfully"
    this.alertService.success('Registration successful');
  }
}
