import UpcomingMatch from 'hltv/lib/models/UpcomingMatch';
import LiveMatch from 'hltv/lib/models/LiveMatch';
import FullMatch from 'hltv/lib/models/FullMatch';
export default class Hltv {
    constructor();
    getMatches(): Promise<(UpcomingMatch | LiveMatch)[]>;
    getMatch(id: number): Promise<FullMatch>;
}
