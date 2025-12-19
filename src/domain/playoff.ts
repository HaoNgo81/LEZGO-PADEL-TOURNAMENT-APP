import { Team, Match, Round } from "./tournament";
import { TeamLeaderboardRow } from "./teamLeaderboard";

export type PlayoffType = "TOP_4" | "TOP_8";

export interface PlayoffRound extends Round {
  name: string;
}

export function generateTeamPlayoff(
  leaderboard: TeamLeaderboardRow[],
  teams: Team[],
  type: PlayoffType
): PlayoffRound {
  const size = type === "TOP_4" ? 4 : 8;
  const qualified = leaderboard.slice(0, size);

  const seeded = qualified.map(row => {
    const team = teams.find(t => t.id === row.teamId);
    if (!team) throw new Error("Hold ikke fundet");
    return team;
  });

  const matches: Match[] = [];

  if (type === "TOP_4") {
    matches.push(
      createMatch(1, seeded[0], seeded[3]),
      createMatch(2, seeded[1], seeded[2])
    );
    return { roundNumber: 1, name: "Semifinaler", matches };
  }

  matches.push(
    createMatch(1, seeded[0], seeded[7]),
    createMatch(2, seeded[1], seeded[6]),
    createMatch(3, seeded[2], seeded[5]),
    createMatch(4, seeded[3], seeded[4])
  );

  return { roundNumber: 1, name: "Kvartfinaler", matches };
}

function createMatch(
  court: number,
  teamA: Team,
  teamB: Team
): Match {
  return { court, teamA, teamB };
}
