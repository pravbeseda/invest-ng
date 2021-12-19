import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  styleUrls: ['./portfolio-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioModalComponent {
  @Input()
  set opened(opened: boolean) {
    if (!opened) {
      this.nameControl.reset();
    }
  }

  readonly nameControl = new FormControl(null, [Validators.required]);

  save() {

  }
}
