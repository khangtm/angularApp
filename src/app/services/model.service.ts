import { Injectable, TemplateRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable()
export class ModalService {
   public modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
  ) { }

  openModalByTemplate(template: TemplateRef<any>, modalParams: any){
    this.modalRef = this.modalService.show(template, modalParams);
  }

  openModalComponent(component:any, modalParams: any): Observable<string>{
    this.modalRef = this.modalService.show(component, modalParams);
    return new Observable<string>(this.getMessageSubscriber());
  }

  closeModal(){
    this.modalRef.hide();
  }

  private getMessageSubscriber() {
    return (observer) => {
      const subscription = this.modalService.onHidden.subscribe((reason: string) => {
        observer.next(this.modalRef.content);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }
}
