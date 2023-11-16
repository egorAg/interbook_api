import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "@/modules/user/user.module";
import { CryptoModule } from "@/modules/crypto/crypto.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, CryptoModule]
})
export class AuthModule {}
