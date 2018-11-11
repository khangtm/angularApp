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
import { EditUserComponent } from './edit-user.component';
import { CreateUserComponent } from './create-user.component';

import { UserDataSource } from './user-datasource';
import { UserService } from '../../services/index';
import { first } from 'rxjs/operators';


@Component({
  templateUrl: 'user.component.html',
  providers: [{ provide: AlertConfig, }]
})
export class UserComponent implements OnInit {
  
  userDataSource = UserDataSource;
  alertMessage: any = {};

  //table filter
  searchText : string;
  searchRole : string = "";

  // paging  
  itemsPerPage: number   = 20;
  currentPage: number   = 1;

  // searchResul
  items: any;
  totalItems: number;

  constructor(
    private modalService: ModalService,
    private alertService: AlertService,
    private userService: UserService,
    
  ) { }

  ngOnInit(){
    this.searchData(this.currentPage);
  }

  searchData(pageNo :number) {
    const searchCondition = {
      paging : {pageSize: this.itemsPerPage, pageNo: pageNo},
      condition : {username: this.searchText, role: this.searchRole},
      sortBy : {column : 'account.username', order: "ASC"}
    }
    this.userService.getAll(searchCondition).pipe(first())
    .subscribe(
      data => {
        let result: any = data;
        this.items = result.items;
        this.totalItems = result.totalItems;
        console.log(this.items);
      },
      error => {
        this.alertMessage = {  type: 'danger',  msg: error}
    });
  }

  //-- START: Open Modal
  viewModel: any = {};
  userId : number;

  openDeleteModal(template: TemplateRef<any>, id: number) {
    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-sm' });
    this.modalService.openModalByTemplate(template, modalParams);
  }

  openViewModal(template: TemplateRef<any>, id: number) {
    this.view(id);
    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-lg' });
    this.modalService.openModalByTemplate(template, modalParams);
  }

  openRegisterModal(){
    const modalParams = Object.assign({},{class: 'modal-dialog-centered modal-lg' });
    let messageReturn = this.modalService.openModalComponent(CreateUserComponent, modalParams);
  }

  openEditModal(userInfo) {
    const initialState = {
      userInfo: userInfo  
    };
    const modalParams = Object.assign({}, {initialState, class: 'modal-dialog-centered modal-lg' });
    this.modalService.openModalComponent(EditUserComponent, modalParams);
  }

  closeModal(){
    this.modalService.closeModal();
  }

  //-- END: Open Modal
  
  //-- START: Paging
  setPage(pageNo: number){
    this.currentPage = pageNo;
  }

  pageChanged(event: any){
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
    this.searchData(event.page)
  }

  //-- END: Paging

  // Delete user
  delete(id: number){
    console.log("Delete user : " + id);
    this.userService.delete(id).pipe(first())
    .subscribe(
      data => {
        console.log(data);
        let result:any = data
        if(result.success){
          this.alertService.success('Delete successful');
        }else{
          this.alertMessage = {  type: 'danger',  msg: result.data}
        }
      },
      error => {
        this.alertMessage = {  type: 'danger',  msg: error}
    });
    this.closeModal();
  }

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

}


