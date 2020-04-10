export type DirectionType = 'u'|'d'|'l'|'r';

export interface IStorePayload {
  type: string;
  value: any;
}

export interface IStateUi {
  shouldUseDarkMode: boolean;
}

export interface IStateGame {
  grid: [[IGameCell | null]];
  playerTurn: number;
}

export interface IStatePlayer {
  score: number;
  totalTurns: number;
  blockCounts: object;
}

export interface IStatePlayers {
  players: [IStatePlayer];
}

export interface IGameCell {
  row: number;
  col: number;
  value: number;
}

// @todo GameGrid Type IGameCell[][]
