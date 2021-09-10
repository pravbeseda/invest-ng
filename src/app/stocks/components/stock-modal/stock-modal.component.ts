import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock-modal.component.html',
  styleUrls: ['./stock-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
