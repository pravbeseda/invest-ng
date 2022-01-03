import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Portfolio} from '@models/portfolio';

@Component({
  selector: 'app-portfolio-list-item',
  templateUrl: './portfolio-list-item.component.html',
  styleUrls: ['./portfolio-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListItemComponent implements OnInit {
  @Input()
  portfolio!: Portfolio;

  constructor() { }

  ngOnInit(): void {
  }

}
