import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { UserDataSource } from './user-datasource';
import { EditUserComponent } from './edit-user.component';

@Component({
  templateUrl: 'user.component.html',
  providers: [{ provide: AlertConfig, }]
})
export class UserComponent implements OnInit {
  
  userDataSource = UserDataSource;
  userList = [];

  alerts: any = [];

  //table filter
  searchText : string;
  searchRole : string = "";
  

  constructor(private modalService: BsModalService) { }

  ngOnInit(){
    this.totalItems = this.userDataSource.length;
    this.getPageItems(1);
  }

  //-- START: Open Modal
  registerModel: any = {};
  loading = false;
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  idDelete : number;

  openDeleteModal(template: TemplateRef<any>, item : any) {
    let  initialState = {
      title: 'Hello window',
    };
    this.idDelete = item.id;
    const modalParams = Object.assign({},{initialState, class: 'modal-dialog-centered modal-sm' });
    this.modalRef = this.modalService.show(template, modalParams);
  }

  openRegisterModal(template: TemplateRef<any>){

    this.registerModel ={};
    this.registerModel.privilegeradio = 'privilege-default';

    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-lg' });
    this.modalRef = this.modalService.show(template, modalParams);
  }

  openEditModal(userId) {
    const initialState = {
      userId: userId, //<-- Pass your id here
      message: "",  
    };
    const modalParams = Object.assign({}, {initialState, class: 'modal-dialog-centered modal-lg' });
    this.modalRef = this.modalService.show(EditUserComponent, modalParams);

    //Get message return
    let messageReturn =  new Observable<string>(this.getMessageSubscriber());
    messageReturn.subscribe((message) => {
      console.log(message);
      this.alerts.push({
        type: 'success',
        msg: message,
        timeout: 5000
      });
    });

  }

  private getMessageSubscriber() {
    return (observer) => {
      const subscription = this.modalService.onHidden.subscribe((reason: string) => {
        observer.next(this.modalRef.content.message);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
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
    this.userList = []; 
    for(let item of this.userDataSource){ 
      if( index >= start && index <= end ){
        this.userList.push(item);
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
    this.userList = null;
    this.getPageItems(event.page);
  }

  //-- END: Paging

  //Register user
  register() {
    this.loading = true;
    console.log(this.registerModel);
    this.loading = false;
    this.modalRef.hide();
    let message = "Register successfully"
    this.alerts.push({
      type: 'success',
      msg: message,
      timeout: 5000
    });
  }

  // Delete user
  delete(id: number){
    console.log("Delete user : " + id);
    //this.userList.splice(index, 1); 
    this.userList = this.userList.filter(item => item.id !== id);
    this.modalRef.hide();
    let message = "User " + id  + " is deleted"
    this.alerts.push({
      type: 'success',
      msg: message,
      timeout: 5000
    });
  }
}
