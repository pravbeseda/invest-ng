export interface SortField {
  property: string;
  direction: SortDirections;
}

export type SortDirections = 'DESC' | 'ASC';
