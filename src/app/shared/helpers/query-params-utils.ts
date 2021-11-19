import { ParsedSort, Sort } from './query-params-parser';

export class QueryParamsUtils {
  static mapSort(parsedSort: ParsedSort): Sort | null {
    try {
      return { orders: Object.entries(parsedSort).map(([property, direction]) => ({ property, direction })) };
    } catch {
      return null;
    }
  }

  static parseValue(value: string): any {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  static serialize(value: any): string {
    return JSON.stringify(value);
  }
}
