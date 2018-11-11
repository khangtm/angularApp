// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { EditUserComponent } from './edit-user.component';
import { CreateUserComponent } from './create-user.component';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Modal Component
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

// System Routing
import { UserRoutingModule } from './user-routing.module';

// Import pipes
import { PipesModule } from '../../pipes/pipes.module';

// Import service
import { ModalService } from '../../services/model.service';

// Alert Component
import { AlertComponent } from '../../directives/alert.component';
import { SharedModule } from '../../share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PipesModule,
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    // AlertComponent
  ],
  providers: [
    ModalService,
    
  ],
  entryComponents: [
    CreateUserComponent,
    EditUserComponent,
  ]
})
export class UserModule { }
