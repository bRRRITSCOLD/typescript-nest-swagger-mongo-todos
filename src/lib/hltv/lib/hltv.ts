/* node_modules */
import * as  hltvApi from 'hltv-api';
import HLTV from 'hltv'

/* libraries */
import logger from '../../logger';
import utils from '../../utils';

/* interfaces */
import { IAPIError } from '../../../models/errors';
import UpcomingMatch from 'hltv/lib/models/UpcomingMatch';
import LiveMatch from 'hltv/lib/models/LiveMatch';
import FullMatch from 'hltv/lib/models/FullMatch';

/* models */
import { APIError } from '../../../models/errors';

export default class Hltv {
  constructor() {}

  public async getMatches(): Promise<(UpcomingMatch | LiveMatch)[]> {
    try {
      logger.debug(`{}Hltv::#getMatches::initiating execution`);

      const matches: (UpcomingMatch | LiveMatch)[] = await HLTV.getMatches();

      logger.info(`{}Hltv::#getMatches::successfully executed`);

      return matches;
    } catch (err) {
      const error: IAPIError = new APIError(err);
      logger.error(`{}Hltv::#getMatches::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async getMatch(id: number): Promise<FullMatch> {
    try {
      logger.debug(`{}Hltv::#getMatch::initiating execution`);

      const match: FullMatch = await HLTV.getMatch({ id });

      logger.info(`{}Hltv::#getMatch::successfully executed`);

      return match;
    } catch (err) {
      const error: IAPIError = new APIError(err);
      logger.error(`{}Hltv::#getMatch::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }
}