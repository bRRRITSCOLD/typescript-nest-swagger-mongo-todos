/* node_modules */
import { ApiModelProperty } from "@nestjs/swagger";


export interface IAPIErrorSource {
  pointer?: string | any;
  param?: string | any;
}

export interface IAPIError {
  title: string;
  statusCode: number;
  source: IAPIErrorSource;
  detail: string;
}

export class APIErrorSource {
  @ApiModelProperty({ type: 'string' })
  public pointer: string;

  @ApiModelProperty({ type: 'string' })
  public param: string;

  constructor(errorSource: IAPIErrorSource | any) {
    this.pointer = errorSource.pointer || undefined,
    this.param = errorSource.param || undefined
  }
}

export class APIError {
  @ApiModelProperty({ type: 'string' })
  public title: string;

  @ApiModelProperty({ type: 'number' })
  public statusCode: number;

  @ApiModelProperty({ type: APIErrorSource })
  public source: APIErrorSource;

  @ApiModelProperty({ type: 'string' })
  public detail: string;

  constructor(error: IAPIError | any) {
    this.title = error.message || error.title || 'uncaught exception',
    this.statusCode = error.statusCode || 500,
    this.source = error.source ? new APIErrorSource(error.source) : new APIErrorSource({}),
    this.detail = error.stack || error.detail

    if (process.env.NODE_ENV === 'PREP' || process.env.NODE_ENV === 'PROD') this.detail = undefined;
  }
}
