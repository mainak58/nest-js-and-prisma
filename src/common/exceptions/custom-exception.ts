// src/common/exceptions/custom-exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, code = 400, customFields: any = {}) {
    super(
      {
        status: 'fail',
        message,
        ...customFields,
      },
      code,
    );
  }
}
