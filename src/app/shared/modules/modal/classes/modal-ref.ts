import { Subject } from 'rxjs';
import {ComponentType, OverlayRef} from '@angular/cdk/overlay';

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data?: R;
}

// R = тип ответа, T = тип данных, переданных в модалку
export class ModalRef<R = any, T = any> {
  afterClosed$ = new Subject<OverlayCloseEvent<R>>();

  constructor(
    public overlay: OverlayRef,
    public content: ComponentType<any>,
    public data?: T // pass data to modal i.e. FormData
  ) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick'));
  }

  close(data?: R) {
    this._close('close', data);
  }

  private _close(type: 'backdropClick' | 'close', data?: R) {
    this.overlay.dispose();
    this.afterClosed$.next({
      type,
      data
    });

    this.afterClosed$.complete();
  }
}
