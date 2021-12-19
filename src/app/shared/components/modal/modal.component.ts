import {Component, OnInit, ChangeDetectionStrategy, Input, HostBinding, Output, EventEmitter} from '@angular/core';

// Прототип: https://tailwindcomponents.com/component/very-simple-modal
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  @Input()
  opened = false;

  @Input()
  modalClass = '';

  @Output()
  readonly close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
