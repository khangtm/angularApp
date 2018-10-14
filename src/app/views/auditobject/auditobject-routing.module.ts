import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditObjectComponent } from './auditobject.component';


const routes: Routes = [
  {
    path: '',
    component: AuditObjectComponent,
    data: {
      title: 'User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditObjectRoutingModule {}
