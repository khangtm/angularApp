import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  templateUrl: 'edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(){
    console.log(this.userId);
  }

  //-- START: Open Modal
  registerModel: any = {};
  loading = false;
  userId : number;
  message : String;
  //-- END: Open Modal
  
  //Register user
  edit() {
    this.loading = true;
    console.log(this.registerModel);
    this.loading = false;
    this.modalRef.hide();
    this.message = "Edit successfully"
  }
}
