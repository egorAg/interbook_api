import { Module } from '@nestjs/common';
import { UserModule } from '../../user.module';
import { MeUsecase } from './me.usecase';
import { MeController } from './me.controller';

@Module({
  imports: [UserModule],
  providers: [MeUsecase],
  controllers: [MeController],
})
export class MeModule {}
