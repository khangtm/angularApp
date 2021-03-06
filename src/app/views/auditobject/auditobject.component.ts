import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

// Import Alert
import { AlertConfig } from 'ngx-bootstrap/alert';
import { AlertService } from '../../services/alert.service';

// Import modal service
import { ModalService } from '../../services/model.service';

// Import component
import { EditAuditObjectComponent } from './edit-auditobject.component';
import { CreateAuditObjectComponent } from './create-auditobject.component';

import { AuditObjectSource } from './auditobject-datasource';


@Component({
  templateUrl: 'auditobject.component.html',
  providers: [{ provide: AlertConfig, }]
})
export class AuditObjectComponent implements OnInit {
  
  auditObjectDataSource = AuditObjectSource;
  auditObjectList = [];

  alerts: any = [];
  private subscription: Subscription;

  //table filter
  searchText : string;
  searchTag : string = "";
  

  constructor(
    private modalService: ModalService,
    private alertService: AlertService
  ) { }

  ngOnInit(){
    this.totalItems = this.auditObjectDataSource.length;
    this.getPageItems(1);

    this.subscription = this.alertService.getMessage().subscribe(message => { 
      if(message){
        this.addMessage(message['type'], message['text']); 
      } 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //-- START: Open Modal
  viewModel: any = {};
  userId : number;
  visibleDeleteButton = false;
  modalTitle: String;

  openDeleteModal(template: TemplateRef<any>, id: number) {
    this.userId = id;
    this.visibleDeleteButton = true;
    this.modalTitle = "監査対象Oracle 削除"
    this.view(id);
    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-lg' });
    this.modalService.openModalByTemplate(template, modalParams);
  }

  openViewModal(template: TemplateRef<any>, id: number) {
    this.visibleDeleteButton = false;
    this.modalTitle = "監査対象Oracle 参照"
    this.view(id);
    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-lg' });
    this.modalService.openModalByTemplate(template, modalParams);
  }

  openRegisterModal(){
    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-lg' });
    this.modalService.openModalComponent(CreateAuditObjectComponent, modalParams);
  }

  openEditModal(userId) {
    const initialState = {
      userId: userId  
    };
    const modalParams = Object.assign({}, {initialState, class: 'modal-dialog-centered modal-lg' });
    this.modalService.openModalComponent(EditAuditObjectComponent, modalParams);
  }

  closeModal(){
    this.modalService.closeModal();
  }

  //-- END: Open Modal
  
  //-- START: Paging
  totalItems: number = 64;
  currentPage: number   = 1;
  smallnumPages: number = 0;
  pageSize: number = 10;

  maxSize: number = 5;
  bigTotalItems: number = 675;
  bigCurrentPage: number = 1;
  numPages: number = 0;

  currentPager: number   = 1;

  setPage(pageNo: number){
    this.currentPage = pageNo;
  }

  getPageItems(pageNo : number) {
    let start = (pageNo - 1) * this.pageSize + 1;
    let end = pageNo * this.pageSize;
    let index = 1;  
    this.auditObjectList = []; 
    for(let item of this.auditObjectDataSource){ 
      if( index >= start && index <= end ){
        this.auditObjectList.push(item);
      }
      if(index > end){
        return;
      }
      index ++;       
    }
  }

  pageChanged(event: any){
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.auditObjectList = null;
    this.getPageItems(event.page);
  }

  //-- END: Paging

  //-- START : ACTION

  // Delete audit object
  delete(id: number){
    this.auditObjectList = this.auditObjectList.filter(item => item.id !== id);
    this.closeModal();
    let message = "監査対象Oracleを削除しました。";
    this.addMessage('success',message);
  }

  // View audit object
  view(id: number){
    this.viewModel = {
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

  // -- END: ACTION

  // Add alert
  private addMessage(type:String, message:String){
    this.alerts.push({
      type: type,
      msg: message,
      timeout: 5000
    });
  }
}


