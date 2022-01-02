export interface NewStock {
  ticker: string;
  name: string;
  currency: string;
  figi: string;
  isin: string;
  type: string;
  lastPrice: number;
  driver: string;
  boardId: string;
}

export interface StockItem extends NewStock {
  id: number;
  created_at: number;
  updates_at: number;
}
