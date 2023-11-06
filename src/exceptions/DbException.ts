import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class DbException extends HttpException {
  constructor(err) {
    Logger.error(err);
    super('DB error', HttpStatus.BAD_REQUEST);
  }
}
