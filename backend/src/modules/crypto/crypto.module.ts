import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
})
export class CryptoModule {}
