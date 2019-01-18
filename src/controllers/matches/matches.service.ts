/* node_modules */
import { Injectable } from '@nestjs/common';

/* libraries */
import hltv from '../../lib/hltv';
import logger from '../../lib/logger';
import utils from '../../lib/utils';

/* interfaces */
import { IMatch } from '../../models/matches';

/* models */
import { APIError } from '../../models/errors';
import { Matches, Match } from '../../models/matches';
import FullMatch from 'hltv/lib/models/FullMatch';

@Injectable()
export class MatchesService {

  public async getAll(): Promise<Matches> {
    try {
      logger.debug(`{}MatchesService::#getAll::initiating execution`);

      const matches = await hltv.getMatches()

      if (!matches.length) {
        const e: any = new Error('no matches found');
        e.statusCode = 404;
        throw e;
      }

      const response: Matches = new Matches(matches);
  
      logger.info(`{}MatchesService::#getAll::successfully executed`);

      return response;
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}MatchesService::#getAll::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async getOne(id: number): Promise<Match> {
    try {
      logger.debug(`{}MatchesService::#getOne::initiating execution`);

      const match: IMatch | FullMatch = await hltv.getMatch(id);

      const response: Match = new Match(match);

      logger.info(`{}MatchesService::#getOne::successfully executed`);

      return response;
    } catch (err) {
      const error: APIError = new APIError(err);

      if (err.title === `Cannot read property 'split' of undefined`) {
        error.title = 'no match found';
        error.statusCode = 404;
      }

      logger.error(`{}MatchesService::#getOne::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }
}
