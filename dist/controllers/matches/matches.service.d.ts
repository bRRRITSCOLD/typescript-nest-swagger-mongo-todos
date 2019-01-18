export declare class MatchesService {
    private readonly matches;
    getAll(): Promise<(import("hltv/lib/models/UpcomingMatch").default | import("hltv/lib/models/LiveMatch").default)[]>;
    getOne(id: number): Promise<import("hltv/lib/models/FullMatch").default>;
}
