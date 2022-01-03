import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWrapperComponent {
  @Input()
  title?: string;
}
