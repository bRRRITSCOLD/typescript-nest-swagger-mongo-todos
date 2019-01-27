/* node_modules */
import { ArgumentMetadata, Injectable, PipeTransform, Response } from '@nestjs/common';

/* models */
import { Str } from '../../models/base';

@Injectable()
export class StringPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const str = new Str(value);
      await str.validate();

      return str.value;
    } catch (err) {
      throw err;
    }
  }
}