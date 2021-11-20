import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {SortDirections} from '../models/common';

@Injectable()
export class BindQueryParamsService {
  private storedChanges: Record<string, any> = {};

  constructor(private router: Router, private route: ActivatedRoute) {}

  getSearchParameter$(name: string | number): Observable<any> {
    return this.route.queryParams.pipe(map(queryParams => queryParams[name]));
  }

  setSearchParameter(name: string | number, value: any): void {
    this.storedChanges[name] = value;
  }

  getSortParameter$(name: string): Observable<SortDirections> {
    return this.route.queryParams.pipe(
      map(({ sort }) => {
        if (sort) {
          try {
            return JSON.parse(sort)[name];
          } catch {
            return null;
          }
        }
      })
    );
  }

  setSortParameter(name: string, direction: SortDirections): void {
    let sort = this.route.snapshot.queryParams.sort;

    if (sort) {
      // Первая делает этот сорт-контрол первым в списке, т.к. там важна последовательность.
      // Вторая заполняет сортировку имеющимися значениями в URL.
      // Третья переписывает значение сорт-контрола из URL на нужное.
      sort = { [name]: direction, ...JSON.parse(sort), [name]: direction };
    } else {
      sort = { [name]: direction };
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: JSON.stringify(sort) },
      queryParamsHandling: 'merge',
    });
  }

  updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.storedChanges, page: null },
      queryParamsHandling: 'merge',
    });
  }

  // Метод добавляет уникальное значение в queryParams,
  // чтобы сработал резолвер
  updateResolver(): void {
    this.setSearchParameter('t', Date.now());
    this.updateQueryParams();
  }

  resetQueryParams(): void {
    Object.keys(this.storedChanges).forEach(key => (this.storedChanges[key] = 'null'));
    this.updateQueryParams();
  }
}
