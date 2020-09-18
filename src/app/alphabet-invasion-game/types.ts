export interface Letter {
  symbol: string;
  row: number;
  col: number;
}

export interface State {
  score: number;
  level: number;
  letters: Letter[];
}
