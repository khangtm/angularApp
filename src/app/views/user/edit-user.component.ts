import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertService } from '../../services';

@Component({
  templateUrl: 'edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef,
    private alertService: AlertService
  ) { }

  ngOnInit(){
    this.editModel = {
      id: this.userId,
      registername : '登録名',
      hostname : '192.168.1.1',
      servicename: 'orclpdb1',
      port: '1521',
      username: 'SYS',
      password: 'Enter password…',
      privilegeradio: 'privilege-default',
      description: ''       
    };
  }

  loading = false;
  userId : number;
  editModel: any = {};

  //Register user
  edit() {
    this.loading = true;
    console.log(this.editModel);
    this.loading = false;
    this.modalRef.hide();
    this.alertService.success('Edit successful');
  }
}
