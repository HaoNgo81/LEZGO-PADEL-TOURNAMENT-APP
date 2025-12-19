export interface Player {
  id: string;
  name: string;
}

export type Gender = "M" | "F";

export interface MixPlayer extends Player {
  gender: Gender;
}

export interface Team {
  id: string;
  players: Player[];
}

export interface Match {
  court: number;
  teamA: Team;
  teamB: Team;
  scoreA?: number;
  scoreB?: number;
}

export interface Round {
  roundNumber: number;
  matches: Match[];
}

export enum RankingMode {
  MOST_POINTS = "MOST_POINTS",
  MOST_WINS = "MOST_WINS",
  MOST_WINS_THEN_POINTS = "MOST_WINS_THEN_POINTS"
}
