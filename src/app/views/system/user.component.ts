import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

  userList = [];
  totalItems: number = 64;
  currentPage: number   = 1;
  smallnumPages: number = 0;
  pageSize: number = 10;

  maxSize: number = 5;
  bigTotalItems: number = 675;
  bigCurrentPage: number = 1;
  numPages: number = 0;

  currentPager: number   = 1;

  constructor() { }
  
  ngOnInit(){
    this.totalItems = this.DATASOURCE.length;
    this.getPageItems(1);
  }
  setPage(pageNo: number){
    this.currentPage = pageNo;
  }

  getPageItems(pageNo : number) {
    let start = (pageNo - 1) * this.pageSize + 1;
    let end = pageNo * this.pageSize;
    let index = 1;  
    this.userList = []; 
    for(let item of this.DATASOURCE){
      console.log( '1-' + index); 
      if( index >= start && index <= end ){
        console.log(index); 
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

  DATASOURCE = [
    {
      username:'Vishnu Serghei 1',
      dateRegistered:'2012/01/01',
      role:'Member',
      status:'Active',
      statusCssClass:'badge badge-success'
    },
    {
      username:'Zbyněk Phoibos 2',
      dateRegistered:'2012/01/01',
      role:'Staff',
      status:'Banned',
      statusCssClass:'badge badge-danger'
    },
    {
      username:'Einar Randall 3',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Inactive',
      statusCssClass:'badge badge-secondary'
    },
    {
      username:'Félix Troels 4',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Pending',
      statusCssClass:'badge badge-warning'
    },
    {
      username:'Vishnu Serghei 5',
      dateRegistered:'2012/01/01',
      role:'Member',
      status:'Active',
      statusCssClass:'badge badge-success'
    },
    {
      username:'Zbyněk Phoibos 6',
      dateRegistered:'2012/01/01',
      role:'Staff',
      status:'Banned',
      statusCssClass:'badge badge-danger'
    },
    {
      username:'Einar Randall 7',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Inactive',
      statusCssClass:'badge badge-secondary'
    },
    {
      username:'Félix Troels 8',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Pending',
      statusCssClass:'badge badge-warning'
    },
    {
      username:'Vishnu Serghei 9',
      dateRegistered:'2012/01/01',
      role:'Member',
      status:'Active',
      statusCssClass:'badge badge-success'
    },
    {
      username:'Zbyněk Phoibos 10',
      dateRegistered:'2012/01/01',
      role:'Staff',
      status:'Banned',
      statusCssClass:'badge badge-danger'
    },
    {
      username:'Einar Randall 11',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Inactive',
      statusCssClass:'badge badge-secondary'
    },
    {
      username:'Félix Troels',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Pending',
      statusCssClass:'badge badge-warning'
    },
    {
      username:'Vishnu Serghei',
      dateRegistered:'2012/01/01',
      role:'Member',
      status:'Active',
      statusCssClass:'badge badge-success'
    },
    {
      username:'Zbyněk Phoibos',
      dateRegistered:'2012/01/01',
      role:'Staff',
      status:'Banned',
      statusCssClass:'badge badge-danger'
    },
    {
      username:'Einar Randall',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Inactive',
      statusCssClass:'badge badge-secondary'
    },
    {
      username:'Félix Troels',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Pending',
      statusCssClass:'badge badge-warning'
    },
    {
      username:'Vishnu Serghei',
      dateRegistered:'2012/01/01',
      role:'Member',
      status:'Active',
      statusCssClass:'badge badge-success'
    },
    {
      username:'Zbyněk Phoibos',
      dateRegistered:'2012/01/01',
      role:'Staff',
      status:'Banned',
      statusCssClass:'badge badge-danger'
    },
    {
      username:'Einar Randall',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Inactive',
      statusCssClass:'badge badge-secondary'
    },
    {
      username:'Félix Troels',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Pending',
      statusCssClass:'badge badge-warning'
    },
    {
      username:'Vishnu Serghei',
      dateRegistered:'2012/01/01',
      role:'Member',
      status:'Active',
      statusCssClass:'badge badge-success'
    },
    {
      username:'Zbyněk Phoibos',
      dateRegistered:'2012/01/01',
      role:'Staff',
      status:'Banned',
      statusCssClass:'badge badge-danger'
    },
    {
      username:'Einar Randall',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Inactive',
      statusCssClass:'badge badge-secondary'
    },
    {
      username:'Félix Troels',
      dateRegistered:'2012/01/01',
      role:'Admin',
      status:'Pending',
      statusCssClass:'badge badge-warning'
    },
  ];
}
