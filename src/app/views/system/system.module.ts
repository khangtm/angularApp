// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// System Routing
import { SystemRoutingModule } from './system-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    SystemRoutingModule
  ],
  declarations: [
    UserComponent
  ]
})
export class SystemModule { }
