import { MixPlayer, Round, Team } from "./tournament";

export function generateMixicanoRound(
  players: MixPlayer[],
  courts: number,
  scores: Map<string, number>
): Round {
  const men = players
    .filter(p => p.gender === "M")
    .sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0));

  const women = players
    .filter(p => p.gender === "F")
    .sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0));

  const matches = [];

  for (let c = 0; c < courts; c++) {
    const i = c * 2;
    if (!men[i + 1] || !women[i + 1]) break;

    const teamA: Team = {
      id: `A-${c}`,
      players: [men[i], women[i]]
    };

    const teamB: Team = {
      id: `B-${c}`,
      players: [men[i + 1], women[i + 1]]
    };

    matches.push({ court: c + 1, teamA, teamB });
  }

  return { roundNumber: 1, matches };
}
