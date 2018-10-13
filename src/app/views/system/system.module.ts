// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user.component';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// System Routing
import { SystemRoutingModule } from './system-routing.module';

// Import pipes
import { TableFilterPipe } from '../../pipes/table-filter.pipe';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    SystemRoutingModule
  ],
  declarations: [
    TableFilterPipe,
    UserComponent,
    EditUserComponent
  ],
  entryComponents: [
    EditUserComponent,
  ]
})
export class SystemModule { }
