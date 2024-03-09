import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsController } from './controllers/tags.controller';
import { TagModel } from './entities/models/tag.entity';
import { TagRepository } from './entities/repositories/tag.repository';
import { TagsService } from './services/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagModel])],
  providers: [TagsService, TagRepository],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
