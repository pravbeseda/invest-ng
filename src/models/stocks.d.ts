export interface StockItem {
  id?: number;
  ticker: string,
  name: string,
  currency: string,
  figi: string,
  isin: string,
  type: string,
  lastPrice: number,
  created_at?: number,
  updates_at?: number,
}
