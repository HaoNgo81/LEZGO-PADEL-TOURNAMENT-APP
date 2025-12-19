import { Team, Match, Round } from "./tournament";

export interface TeamScore {
  teamId: string;
  wins: number;
  pointsFor: number;
  pointsAgainst: number;
}

export function generateTeamMexicanoRound(
  teams: Team[],
  courts: number,
  scores: Map<string, TeamScore>
): Round {
  const sorted = [...teams].sort((a, b) => {
    const A = scores.get(a.id);
    const B = scores.get(b.id);

    if ((B?.wins ?? 0) !== (A?.wins ?? 0)) {
      return (B?.wins ?? 0) - (A?.wins ?? 0);
    }

    const diffA = (A?.pointsFor ?? 0) - (A?.pointsAgainst ?? 0);
    const diffB = (B?.pointsFor ?? 0) - (B?.pointsAgainst ?? 0);

    return diffB - diffA;
  });

  const matches: Match[] = [];

  for (let c = 0; c < courts; c++) {
    const i = c * 2;
    if (!sorted[i + 1]) break;

    matches.push({
      court: c + 1,
      teamA: sorted[i],
      teamB: sorted[i + 1]
    });
  }

  return { roundNumber: 1, matches };
}
