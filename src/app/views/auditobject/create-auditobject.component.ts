import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AlertService } from '../../services';

@Component({
  templateUrl: 'create-auditobject.component.html',
})
export class CreateAuditObjectComponent implements OnInit {

  modalTitle: String;
  loading = false;
  registerModel: any = {};

  constructor(
    public modalRef: BsModalRef,
    private alertService: AlertService
  ) { }

  ngOnInit(){
    this.modalTitle = "監査対象Oracle 登録";
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

  
  //-- START : ACTION

  // Register audit object
  create() {
    this.loading = true;
    console.log(this.registerModel);
    this.loading = false;
    this.modalRef.hide();
    this.alertService.success('監査対象Oracleを登録しました。');
  }

  // -- END: ACTION
}
