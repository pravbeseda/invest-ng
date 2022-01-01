import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ModalRef} from '../../../shared/modules/modal/classes/modal-ref';
import {UntilDestroy} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioModalComponent {
  @Output() readonly save = new EventEmitter<string>();

  readonly nameControl = new FormControl(null, [Validators.required]);

  constructor(public ref: ModalRef) { }
}
