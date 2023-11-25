import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/modules/user/user.module';
import { CryptoModule } from '@/modules/crypto/crypto.module';
import { SessionModule } from '@/modules/session/session.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, CryptoModule, SessionModule],
})
export class AuthModule {}
