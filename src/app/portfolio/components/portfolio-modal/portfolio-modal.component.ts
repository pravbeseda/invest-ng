import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ModalRef} from '@shared/modules/modal/classes/modal-ref';
import {UntilDestroy} from '@ngneat/until-destroy';
import {Subject} from 'rxjs';
import {Portfolio} from '@models/portfolio';

@UntilDestroy()
@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioModalComponent {
  // Input
  set portfolio(value: Partial<Portfolio>) {
    this.form.patchValue(value);
  }

  // Output
  readonly save$ = new Subject<Partial<Portfolio>>();

  readonly form = this.fb.group({
    id: null,
    name: [null, [Validators.required]],
    balanceRub: null,
    balanceUsd: null,
    balanceEur: null,
  });

  constructor(private fb: FormBuilder, public ref: ModalRef) { }
}
