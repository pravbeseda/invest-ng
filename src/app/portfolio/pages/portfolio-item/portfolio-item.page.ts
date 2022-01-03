import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {Portfolio} from '@models/portfolio';
import {map, pluck} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.page.html',
  styleUrls: ['./portfolio-item.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioItemPage implements OnInit {
  readonly portfolio$: Observable<Portfolio> = this.route.data.pipe(pluck('portfolio'));

  constructor(private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }

}
