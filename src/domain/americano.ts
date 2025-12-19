import { Player, Round, Team } from "./tournament";

export function generateAmericanoRounds(
  players: Player[],
  courts: number
): Round[] {
  if (players.length % 4 !== 0) {
    throw new Error("Antal spillere skal være deleligt med 4");
  }

  const rounds: Round[] = [];
  const totalRounds = players.length - 1;
  let rotation = [...players];

  for (let r = 0; r < totalRounds; r++) {
    const matches = [];

    for (let c = 0; c < courts; c++) {
      const i = c * 4;
      if (!rotation[i + 3]) break;

      const teamA: Team = {
        id: `A-${r}-${c}`,
        players: [rotation[i], rotation[i + 1]]
      };

      const teamB: Team = {
        id: `B-${r}-${c}`,
        players: [rotation[i + 2], rotation[i + 3]]
      };

      matches.push({ court: c + 1, teamA, teamB });
    }

    rounds.push({ roundNumber: r + 1, matches });

    const fixed = rotation[0];
    const rest = rotation.slice(1);
    rest.unshift(rest.pop()!);
    rotation = [fixed, ...rest];
  }

  return rounds;
}
