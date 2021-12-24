import {Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter} from '@angular/core';
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

  @Output()
  private readonly save = new EventEmitter<string>();

  readonly nameControl = new FormControl(null, [Validators.required]);

  saveHandler() {
    this.save.emit(this.nameControl.value);
  }
}
