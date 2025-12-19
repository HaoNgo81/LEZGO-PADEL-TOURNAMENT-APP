import { Match, RankingMode } from "./tournament";

export interface TeamLeaderboardRow {
  teamId: string;
  name: string;
  played: number;
  wins: number;
  pointsFor: number;
  pointsAgainst: number;
  diff: number;
}

export function calculateTeamLeaderboard(
  matches: Match[],
  mode: RankingMode
): TeamLeaderboardRow[] {
  const map = new Map<string, TeamLeaderboardRow>();

  function get(id: string, name: string) {
    if (!map.has(id)) {
      map.set(id, {
        teamId: id,
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

    const nameA = m.teamA.players.map(p => p.name).join(" / ");
    const nameB = m.teamB.players.map(p => p.name).join(" / ");

    const A = get(m.teamA.id, nameA);
    const B = get(m.teamB.id, nameB);

    A.played++;
    B.played++;

    A.pointsFor += m.scoreA!;
    A.pointsAgainst += m.scoreB!;
    B.pointsFor += m.scoreB!;
    B.pointsAgainst += m.scoreA!;

    if (aWin) A.wins++;
    if (bWin) B.wins++;
  }

  map.forEach(r => (r.diff = r.pointsFor - r.pointsAgainst));

  return [...map.values()].sort((a, b) => {
    if (mode === RankingMode.MOST_POINTS) return b.pointsFor - a.pointsFor;
    if (mode === RankingMode.MOST_WINS) return b.wins - a.wins;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.pointsFor - a.pointsFor;
  });
}
