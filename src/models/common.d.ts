export type Intent<T> = T & {
  onSuccess: (result?: any) => void;
};

export type IntentData<T> = Intent<{ data: T }>;

export type Pageable<T> = {
  content: T[],
  totalCount: number;
}
