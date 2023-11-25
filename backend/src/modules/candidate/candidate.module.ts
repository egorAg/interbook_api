import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateService } from '@/modules/candidate/candidate.service';
import { Candidate } from '@/modules/candidate/entities/candidate.entity';
import { UserModule } from '@/modules/user/user.module';
import { SpacesModule } from '@/modules/spaces/spaces.module';
import { CandidateController } from '@/modules/candidate/candidate.controller';

@Module({
  providers: [CandidateService],
  controllers: [CandidateController],
  imports: [TypeOrmModule.forFeature([Candidate]), UserModule, SpacesModule],
  exports: [CandidateService],
})
export class CandidateModule {}
