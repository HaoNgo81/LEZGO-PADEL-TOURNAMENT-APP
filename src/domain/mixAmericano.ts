import { MixPlayer, Round, Team } from "./tournament";

export function generateMixAmericanoRounds(
  players: MixPlayer[],
  courts: number
): Round[] {
  const men = players.filter(p => p.gender === "M");
  const women = players.filter(p => p.gender === "F");

  if (men.length !== women.length) {
    throw new Error("Kræver lige mange mænd og kvinder");
  }

  const rounds: Round[] = [];
  let menRot = [...men];
  let womenRot = [...women];

  for (let r = 0; r < men.length; r++) {
    const matches = [];

    for (let c = 0; c < courts; c++) {
      const i = c * 2;
      if (!menRot[i + 1] || !womenRot[i + 1]) break;

      const teamA: Team = {
        id: `A-${r}-${c}`,
        players: [menRot[i], womenRot[i]]
      };

      const teamB: Team = {
        id: `B-${r}-${c}`,
        players: [menRot[i + 1], womenRot[i + 1]]
      };

      matches.push({ court: c + 1, teamA, teamB });
    }

    rounds.push({ roundNumber: r + 1, matches });

    menRot = rotate(menRot);
    womenRot = rotate(womenRot);
  }

  return rounds;
}

function rotate<T>(arr: T[]): T[] {
  const fixed = arr[0];
  const rest = arr.slice(1);
  rest.unshift(rest.pop()!);
  return [fixed, ...rest];
}
