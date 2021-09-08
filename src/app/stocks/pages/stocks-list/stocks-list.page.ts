import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksListPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
