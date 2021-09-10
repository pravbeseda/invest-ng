import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksListPage implements OnInit {
  openedModal = false;

  constructor() { }

  ngOnInit(): void {
  }

  openStockModal() {
    this.openedModal = true;
    console.log('!!!');
  }

  closeModal() {
    this.openedModal = false;
  }

}
