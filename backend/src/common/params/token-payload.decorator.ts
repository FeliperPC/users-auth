import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { USER_TOKEN_PAYLOAD } from 'src/auth/auth.constants';

export const TokenPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request[USER_TOKEN_PAYLOAD];
  },
);
