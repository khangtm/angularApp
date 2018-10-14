import { NgModule } from '@angular/core';
import { TableFilterPipe} from './table-filter.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    TableFilterPipe
  ],
  exports: [
    TableFilterPipe
  ]
})
export class PipesModule {
    static forRoot() {
        return {
            ngModule: TableFilterPipe,
            providers: [],
        };
     }
}