export interface NewStock {
  ticker: string,
  name: string,
  currency: string,
  figi: string,
  isin: string,
  type: string,
  lastPrice: number,
}

export interface StockItem extends NewStock {
  id: number;
  created_at: number,
  updates_at: number,
}
