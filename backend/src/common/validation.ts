import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_OPTIONS: ValidationPipeOptions = {
  whitelist: true, // strip unknown properties
  forbidNonWhitelisted: true, // ...and reject requests that send them
  transform: true,
  stopAtFirstError: false,
};
