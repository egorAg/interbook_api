import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Tag } from '../../types/tag.type';
import { TagModel } from '../models/tag.entity';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagModel)
    private readonly dataSource: Repository<TagModel>,
  ) {}

  public async findLike(
    name: string,
    page: number,
    pageSize: number,
  ): Promise<Tag[]> {
    return this.dataSource.find({
      where: {
        name: ILike(`%${name}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  public async create(data: Partial<Tag>): Promise<Tag> {
    const candidate = await this.dataSource.findOne({
      where: {
        name: data.name,
      },
    });

    if (candidate) {
      return candidate;
    }

    const tag = this.dataSource.create();
    await this.dataSource.save(tag);
    return tag;
  }

  public async getById(id: number | number[]) {
    const ids = Array.isArray(id) ? id : [id];

    return this.dataSource.find({
      where: {
        id: In(ids),
      },
    });
  }
}
