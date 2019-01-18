/* node_modules */
import { ApiModelProperty } from "@nestjs/swagger";

/* interfaces */
import UpcomingMatch from "hltv/lib/models/UpcomingMatch";
import LiveMatch from "hltv/lib/models/LiveMatch";
import FullMatch from "hltv/lib/models/FullMatch";

export interface IMatch {
  id: number;
  date: number | string | Date;
  team1: { name: string; id: number; };
  team2: { name: string; id: number; };
  format: string;
  event: { name: string; id: number; };
  starts: number;
  live: boolean;
}

export class MatchTeam {
  @ApiModelProperty({ type: 'number' })
  public id: number;

  @ApiModelProperty({ type: 'string' })
  public name: string;
}

export class MatchEvent {
  @ApiModelProperty({ type: 'number' })
  public id: number;

  @ApiModelProperty({ type: 'string' })
  public name: string;
}

export class Match {
  @ApiModelProperty({ type: 'number' })
  public id: number;

  @ApiModelProperty({ type: 'string', format: 'date-time' })
  public date: number | string | Date;

  @ApiModelProperty({ type: MatchTeam })
  public team1: MatchTeam;

  @ApiModelProperty({ type: MatchTeam })
  public team2: MatchTeam;

  @ApiModelProperty({ type: 'string' })
  public format: string;

  @ApiModelProperty({ type: MatchEvent })
  public event: MatchEvent;

  @ApiModelProperty({ type: 'number' })
  public stars: number;

  @ApiModelProperty({ type: 'boolean' })
  public live: boolean;

  constructor(match: IMatch | FullMatch) {
    Object.assign(this, match);
  }
}

export class Matches {
  @ApiModelProperty({ type: [Match] })
  public matches: Match[] = [];


  constructor(matches: (IMatch | UpcomingMatch | LiveMatch)[]) {
    matches.map((match: IMatch) => this.matches.push(new Match(match)));
  }
}
