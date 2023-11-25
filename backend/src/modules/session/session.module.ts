import { Module } from '@nestjs/common';
import { SessionService } from '@/modules/session/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '@/modules/session/entities/session';

@Module({
  providers: [SessionService],
  imports: [TypeOrmModule.forFeature([Session])],
  exports: [SessionService],
})
export class SessionModule {}
