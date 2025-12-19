import { Match, RankingMode } from "./tournament";

export interface PlayerStats {
  playerId: string;
  name: string;
  played: number;
  wins: number;
  pointsFor: number;
  pointsAgainst: number;
  diff: number;
}

export function calculateLeaderboard(
  matches: Match[],
  mode: RankingMode
): PlayerStats[] {
  const map = new Map<string, PlayerStats>();

  function get(id: string, name: string) {
    if (!map.has(id)) {
      map.set(id, {
        playerId: id,
        name,
        played: 0,
        wins: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        diff: 0
      });
    }
    return map.get(id)!;
  }

  for (const m of matches) {
    if (m.scoreA == null || m.scoreB == null) continue;

    const aWin = m.scoreA > m.scoreB;
    const bWin = m.scoreB > m.scoreA;

    m.teamA.players.forEach(p => {
      const r = get(p.id, p.name);
      r.played++;
      r.pointsFor += m.scoreA!;
      r.pointsAgainst += m.scoreB!;
      if (aWin) r.wins++;
    });

    m.teamB.players.forEach(p => {
      const r = get(p.id, p.name);
      r.played++;
      r.pointsFor += m.scoreB!;
      r.pointsAgainst += m.scoreA!;
      if (bWin) r.wins++;
    });
  }

  map.forEach(r => (r.diff = r.pointsFor - r.pointsAgainst));

  return [...map.values()].sort((a, b) => {
    if (mode === RankingMode.MOST_POINTS) return b.pointsFor - a.pointsFor;
    if (mode === RankingMode.MOST_WINS) return b.wins - a.wins;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pointsFor - a.pointsFor;
  });
}
