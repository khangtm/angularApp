// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuditObjectComponent } from './auditobject.component';
import { EditAuditObjectComponent } from './edit-auditobject.component';
import { CreateAuditObjectComponent } from './create-auditobject.component';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// System Routing
import { AuditObjectRoutingModule } from './auditobject-routing.module';

// Import pipes
import { PipesModule } from '../../pipes/pipes.module';

// Import service
import { ModalService } from '../../services/model.service';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Import sort column
import { DataTable} from '../../directives/sort-column.directive';
import { SortColumnComponent } from '../../directives/sort-column.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    PipesModule,
    AuditObjectRoutingModule
  ],
  declarations: [
    AuditObjectComponent,
    CreateAuditObjectComponent,
    EditAuditObjectComponent,
    DataTable,
    SortColumnComponent,
  ],
  providers: [
    ModalService,
  ],
  entryComponents: [
    CreateAuditObjectComponent,
    EditAuditObjectComponent,
  ]
})
export class AuditObjectModule { }
