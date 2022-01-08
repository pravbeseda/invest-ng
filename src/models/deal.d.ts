export interface Deal {
  id: number;
  userId: number;
  portfolioId: number;
  stockId: number;
  quantity: number;
  cost: number;
  costRub: number;
  comment: string;
  created_at: number;
  updates_at: number;
}
