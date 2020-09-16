export interface Letter {
  ltr: string;
  y: number;
}

export interface Letters {
  ltrs: Letter[];
  interval: number;
}

export interface State {
  score: number;
  level: number;
  letters: Letter[];
}
