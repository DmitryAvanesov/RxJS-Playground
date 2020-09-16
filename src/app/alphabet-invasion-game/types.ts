export interface Letter {
  symbol: string;
  position: number;
}

export interface State {
  score: number;
  level: number;
  letters: Letter[];
}
