import { RankingMode } from "./tournament";

export interface ScoreRow {
  id: string;
  wins: number;
  points: number;
}

export function rank(rows: ScoreRow[], mode: RankingMode): ScoreRow[] {
  return [...rows].sort((a, b) => {
    if (mode === RankingMode.MOST_POINTS) return b.points - a.points;
    if (mode === RankingMode.MOST_WINS) return b.wins - a.wins;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.points - a.points;
  });
}
