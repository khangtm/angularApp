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
import { ModalModule } from 'ngx-bootstrap/modal';

// System Routing
import { UserRoutingModule } from './user-routing.module';

// Import pipes
import { PipesModule } from '../../pipes/pipes.module';

// Import service
import { ModalService } from '../../services/model.service';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PipesModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    CreateUserComponent,
    EditUserComponent
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
