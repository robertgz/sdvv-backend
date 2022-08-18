import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ClassValidationService {
  public async validateClassArray(classArray): Promise<void> {
    const errors = await this.validateArray(classArray);

    if (errors.length > 0) {
      console.log({
        level: 'error',
        message: 'Class validation failed',
        errorCount: errors.length,
      });

      throw 'Class validation failed';
    }
  }

  private async validateArray(items) {
    const errorArrays = [];
    for await (const item of items) {
      const validationErrors = await validate(item, {
        skipMissingProperties: true,
      });
      if (validationErrors.length > 0) {
        errorArrays.push(validationErrors);
      }
    }
    return errorArrays;
  }
}
