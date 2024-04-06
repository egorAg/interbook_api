import { Module } from '@nestjs/common';
import {
  CreateCandidateModule,
  GetByIdModule,
  GetForActiveUserModule,
  RemoveModule,
  UpdateModule,
} from './usecases';

@Module({
  imports: [
    CreateCandidateModule,
    GetByIdModule,
    GetForActiveUserModule,
    RemoveModule,
    UpdateModule,
  ],
})
export class CandidatesModule {}
