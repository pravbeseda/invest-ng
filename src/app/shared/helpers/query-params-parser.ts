import { Params } from '@angular/router';
import {SortDirections, SortField} from '@models';
import {QueryParamsUtils} from './query-params-utils';

export type ParsedSort = Record<string, SortDirections>;
interface ParsedPageable {
  page?: number;
  pageSize?: number;
  sort?: ParsedSort;
}
type ParsedParams<T> = ParsedPageable & Partial<T>;

export type Sort = { orders: SortField[] };
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort?: Sort;
}
type FilterParams<T> = { pageable: Pageable } & T;

export class QueryParamsParser<T> {
  // QueryParams со значениями в JSON.stringify(). Нужен для гвардов
  stringifiedParams: Record<string, string>;

  private changed = false;

  // Были ли изменения в парамсах из-за некорректных\отсутствующих полей
  get hasChanged(): boolean {
    return this.changed;
  }

  /**
   * @return готовый объект DTO
   */
  get dto(): FilterParams<T> {
    // Парсим все значения
    const parsedParams: ParsedParams<T> = Object.entries(this.stringifiedParams).reduce((acc, [key, value]) => {
      try {
        acc[key] = JSON.parse(value);
      } catch {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Определяем объект пагинации
    const { page, pageSize, sort, ...filterParams } = parsedParams;
    const pageable: Pageable = { pageNumber: page - 1, pageSize };
    if (sort) {
      pageable.sort = QueryParamsUtils.mapSort(sort);
    }

    return { pageable, ...filterParams } as FilterParams<T>;
  }

  constructor(queryParams: Params, defaultParams?: ParsedParams<T>, pageable = true) {
    // Валидируем пагинацию, удаляя некорректные значения
    this.stringifiedParams = this.validatePagination(queryParams);

    const defaults = pageable ? { pageSize: 50, page: 1 } : {};
    // Применяем дефолтные значения, для отсутсвующих полей
    Object.entries({ ...defaults, ...defaultParams })
      // Значения хранятся в строковом виде для гвардов
      .map(([key, value]) => [key, JSON.stringify(value)])
      .forEach(([key, value]) => {
        if (this.stringifiedParams[key] === undefined) {
          this.stringifiedParams[key] = value;
          this.changed = true;
        }
      });
  }

  /**
   * Функция для валидации данных объекта `pageable`. Т.к. этот объект будет везде одинаковый - то он валидируется здесь.
   * Валидация необходима чтобы запрос не ломался, т.к. у нас нет 404 страницы.
   * Если какое-то поле неверно - то оно удаляется и в конструкторе заменяется на дефолтное значение.
   */
  private validatePagination(queryParams: Params): Record<string, string> {
    const params = { ...queryParams };
    // Валидация размера страницы. Все значения из `PageableComponent.pageSizes`
    if (!['10', '20', '30', '40', '50'].includes(params.pageSize)) {
      this.changed = true;
      delete params.pageSize;
    }

    // Валидация номера страницы. Должно быть положительное число
    if (Math.sign(params.page) !== 1) {
      this.changed = true;
      delete params.page;
    }

    // Валидации сортировки. Проверка на то что объект
    try {
      const sort = JSON.parse(params.sort);

      if (typeof sort !== 'object') {
        this.changed = true;
        delete params.sort;
      }
    } catch {
      // Если сортировки нет в парамсах, то редиректить не надо
      this.changed = params.sort !== undefined;
      delete params.sort;
    }

    return params;
  }
}
