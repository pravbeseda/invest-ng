import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.page.html',
  styleUrls: ['./portfolio-list.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
