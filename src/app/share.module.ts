import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './directives/alert.component';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ AlertComponent, ],
 exports:      [ AlertComponent, ]
})
export class SharedModule { }