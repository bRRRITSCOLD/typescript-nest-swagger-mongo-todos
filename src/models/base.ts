/* node_modules */
import { validate, IsString, IsBoolean } from 'class-validator';

/* models */
import { APIError } from "./errors";

export class BaseModel {
  public async validate(options: any = {}) {
    try {
      const errors = await validate(this, options);

      if (errors.length) {
        const error = new APIError(new Error(''));

        error.statusCode = 400;

        errors.map((err: any) => {
          Object.keys(err.constraints).map((key: string) => {
            if (error.title === 'uncaught exception') {
              error.title = '';
              error.title = error.title + `${err.constraints[key]}`
            } else {
              error.title = error.title + ` - ${err.constraints[key]}`
            }
          });
        });

        throw error;
      }

      return;
    } catch (err) {
      throw err;
    }
  }
}

export class Str extends BaseModel {
  @IsString()
  public value: string;

  constructor(value: string) {
    super();
    Object.assign(this, { value })
  }
}