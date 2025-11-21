import { Global, Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers:[
    {
      provide: HashingService,
      useClass: BcryptService
    },
    AuthService
  ],
  controllers:[AuthController],
  exports:[HashingService]
})
export class AuthModule{

}