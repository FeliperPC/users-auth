import { CanActivate, ExecutionContext, ForbiddenException, Global, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "../config/jwt.config";
import * as config from "@nestjs/config";
import { USER_TOKEN_PAYLOAD } from "../auth.constants";

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService : JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration : config.ConfigType<typeof jwtConfig>
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request : Request = context.switchToHttp().getRequest()
    const token : string | undefined = request.headers.authorization?.split(' ')[1]

    if(!token) throw new UnauthorizedException("User without session")

    try{
      const payload = await this.jwtService.verifyAsync(token,this.jwtConfiguration)
      request[USER_TOKEN_PAYLOAD] = payload
    } catch( error ) {
      throw new ForbiddenException(error, "Unauthrized credencials")
    }

    return true
  }
}