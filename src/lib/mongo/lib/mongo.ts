/* node_modules */
import { MongoClient, Db } from 'mongodb';

/* libraries */
import logger from '../../logger';
import utils from '../../utils';

/* models */
import { APIError } from '../../../models/errors';

export default class Mongo {
  private datasources: any;

  constructor () {
    this.datasources = {};
  }

  public async client (connectionString: string, options: any = {}) {
    try {
      logger.debug(`{}Mongo::#client::initiating execution`);

      const _mongoClient = (cS: string, o: any = {}): Promise<MongoClient> => {
        return new Promise((resolve, reject) => {
          MongoClient.connect(cS, o, (e: any, c: MongoClient) => {
            if (e) return reject(e);
            return resolve(c);
          });
        });
      };

      const client: MongoClient = await _mongoClient(connectionString, options);

      logger.info(`{}Mongo::#client::successfully executed`);

      return client;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#client::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async connect (config: any) {
    try {
      logger.debug(`{}Mongo::#connect::initiating execution`);

      this.datasources[config.name] = {};
      this.datasources[config.name].config = config;
      this.datasources[config.name].client = await this.client(this.datasources[config.name].config.connectionString, this.datasources[config.name].config.options);
      this.datasources[config.name].database = this.datasources[this.datasources[config.name].config.name].client.db(config.database);
      this.datasources[config.name].config.connectionInitTime = new Date();

      logger.info(`{}Mongo::#connect::successfully executed`);

      return;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#connect::error executing::error=${utils.common.stringify(error)}`);
      throw error;

    }
  }

  public async init (configPath?: string) {
    try {
      logger.debug(`{}Mongo::#init::initiating execution`);

      const configs = require(`${process.cwd()}/${configPath}`).default;

      const tasks: any[] = [];

      configs.map((config: any) => tasks.push(this.connect(config)));

      await Promise.all(tasks);

      logger.info(`{}Mongo::#init::successfully executed`);

      return;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#init::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async isConnected (name: string) {
    try {
      logger.debug(`{}Mongo::#isConnected::initiating execution`);

      let connected: boolean = true;

      if (!this.datasources[name].client.isConnected() || !this.datasources[name].client.isConnected({ returnNonCachedInstance: true })) {
        connected = false;
      } else if (!this.datasources[name].client.topology.isConnected() || !this.datasources[name].client.topology.isConnected({ returnNonCachedInstance: true })) {
        connected = false;
      } else if (this.datasources[name].client.topology.isDestroyed() || this.datasources[name].client.topology.isDestroyed({ returnNonCachedInstance: true })) {
        connected = false;
      } else if (!this.datasources[name].database.topology.isConnected() || !this.datasources[name].database.topology.isConnected({ returnNonCachedInstance: true })) {
        connected = false;
      } else if (this.datasources[name].database.topology.isDestroyed() || this.datasources[name].database.topology.isDestroyed({ returnNonCachedInstance: true })) {
        connected = false;
      } else if (!this.datasources[name].database.serverConfig.isConnected() || !this.datasources[name].database.serverConfig.isConnected({ returnNonCachedInstance: true })) {
        connected = false;
      } else if (this.datasources[name].database.serverConfig.isDestroyed() || this.datasources[name].database.serverConfig.isDestroyed({ returnNonCachedInstance: true })) {
        connected = false;
      }

      logger.info(`{}Mongo::#isConnected::successfully executed`);

      return connected;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#isConnected::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async verifyConnection (name: string) {
    try {
      logger.debug(`{}Mongo::#verifyConnection::initiating execution`);

      if (await !this.isConnected(name)) {
        await this.connect(this.datasources[name].config);
      }

      logger.info(`{}Mongo::#verifyConnection::successfully executed`);

      return;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#verifyConnection::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async getDatabase(name: string): Promise<Db> {
    try {
      logger.debug(`{}Mongo::#getDatabase::initiating execution`);

      await this.verifyConnection(name);

      const database = this.datasources[name].database;

      logger.info(`{}Mongo::#getDatabase::successfully executed`);

      return database;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#getDatabase::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public async getClient(name: string) {
    try {
      logger.debug(`{}Mongo::#getDatabase::initiating execution`);

      await this.verifyConnection(name);

      const database = this.datasources[name].database;

      logger.info(`{}Mongo::#getDatabase::successfully executed`);

      return database;
    } catch (err) {
      const error = new APIError(err);
      logger.error(`{}Mongo::#getDatabase::error executing::error=${utils.common.stringify(error)}`);
      throw error;
    }
  }

  public getConfig(name: string) {
    return this.datasources[name].config;
  }
}