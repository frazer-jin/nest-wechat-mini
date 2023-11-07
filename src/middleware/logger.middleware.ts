import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      // Gets the request log
      const reqt = {
        headers: req.headers,
        body: req.body,
        originalUrl: req.originalUrl,
      };
      const resp = {
        headers: res.getHeaders(),
        statusCode: res.statusCode,
      };
      this.logger.log(
        'request: ' +
          JSON.stringify(reqt, null, 4) +
          ', response: ' +
          JSON.stringify(resp, null, 4),
      );
    });
    // Ends middleware function execution, hence allowing to move on
    if (next) {
      next();
    }
  }
}
