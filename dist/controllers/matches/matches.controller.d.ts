import { MatchesService } from './matches.service';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    getAll(req: any, res: any): Promise<any>;
    getOne(req: any, res: any, id: number): Promise<any>;
}
