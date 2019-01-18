/* node_modules */
import { Controller, Get, Param, Request, Response } from '@nestjs/common';

/* libraries */
import logger from '../../lib/logger';
import utils from '../../lib/utils';

/* interfaces */
import { IAPIError } from '../../models/errors';

/* models */
import { APIError } from '../../models/errors';
import { Match, Matches } from '../../models/matches';

/* services */
import { MatchesService } from './matches.service';
import { ApiResponse, ApiUseTags, ApiProduces, ApiOperation } from '@nestjs/swagger';

@Controller('matches')
@ApiUseTags('Matches')
export class MatchesController {

  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiProduces('application/json')
  @ApiOperation({ title: 'get all matches', operationId: 'getAll', deprecated: false, description: 'simple functionality to retrieve information about upcoming and live matches on hltv (to an extent | only shows so far into future)' })
  @ApiResponse({ status: 200, description: 'a list of matches', type: Matches })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async getAllMatches(@Request() req: any, @Response() res: any): Promise<Matches> {
    try {
      logger.debug('{}MatchesController::#getAll::initiating execution');

      const matches: Matches = await this.matchesService.getAll();

      logger.info('{}MatchesController::#getAll::successfully executed');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(matches));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}MatchesController::#getAll::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }
  }

  @Get('/:id')
  @ApiProduces('application/json')
  @ApiOperation({ title: 'get a single match', operationId: 'getOne', deprecated: false, description: 'simple functionality to retrieve information about a single upcoming match' })
  @ApiResponse({ status: 200, description: 'a list of matches', type: [Match] })
  @ApiResponse({ status: 500, description: 'internal server error', type: APIError })
  @ApiResponse({ status: 502, description: 'bad gateway', type: APIError })
  @ApiResponse({ status: 503, description: 'service unavailable', type: APIError })
  @ApiResponse({ status: 504, description: 'gateway timeout', type: APIError })
  @ApiResponse({ status: 400, description: 'bad request', type: APIError })
  @ApiResponse({ status: 401, description: 'unauthorized', type: APIError })
  @ApiResponse({ status: 403, description: 'forbidden', type: APIError })
  @ApiResponse({ status: 404, description: 'invalid input, not found, etc', type: APIError })
  async getOne(@Request() req: any, @Response() res: any, @Param('id') id: number) {
    try {
      logger.debug('{}MatchesController::#getOne::initiating execution');

      const matches = await this.matchesService.getOne(+id);

      logger.info('{}MatchesController::#getOne::successfully executed');

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(utils.common.stringify(matches));
    } catch (err) {
      const error: APIError = new APIError(err);
      logger.error(`{}MatchesController::#getOne::error executing::error=${utils.common.stringify(error)}`);
      res.setHeader('Content-Type', 'application/json');    
      return res.status(error.statusCode).end(utils.common.stringify(error));
    }  
  }
}
