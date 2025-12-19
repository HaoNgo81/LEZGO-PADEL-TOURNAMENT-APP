import { Player, Round, Team } from "./tournament";

export function generateMexicanoRound(
  players: Player[],
  courts: number,
  scores: Map<string, number>
): Round {
  const sorted = [...players].sort(
    (a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0)
  );

  const matches = [];

  for (let c = 0; c < courts; c++) {
    const i = c * 4;
    if (!sorted[i + 3]) break;

    const teamA: Team = {
      id: `A-${c}`,
      players: [sorted[i], sorted[i + 1]]
    };

    const teamB: Team = {
      id: `B-${c}`,
      players: [sorted[i + 2], sorted[i + 3]]
    };

    matches.push({ court: c + 1, teamA, teamB });
  }

  return { roundNumber: 1, matches };
}
