import {Injectable, Injector} from '@angular/core';
import {ComponentType, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ModalRef} from '../classes/modal-ref';
import {ComponentPortal} from '@angular/cdk/portal';
import {OverlayRef} from '@angular/cdk/overlay/overlay-ref';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  overlayRef: OverlayRef | undefined;
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(
    component: ComponentType<any>,
    data?: T
  ): ModalRef<R> {
    this.overlayRef?.detach();
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal'],
      backdropClass: 'modal-background'
    });
    this.overlayRef = this.overlay.create(configs);
    const modalRef = new ModalRef<R, T>(this.overlayRef, component, data);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ModalRef, useValue: data }
      ]
    })
    this.overlayRef.attach(new ComponentPortal(component, null, injector));

    return modalRef;
  }
}
