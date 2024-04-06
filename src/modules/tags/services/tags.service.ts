import { Injectable } from '@nestjs/common';
import { TagRepository } from '../entities/repositories/tag.repository';

@Injectable()
export class TagsService {
  constructor(private readonly repo: TagRepository) {}

  public async create(name: string) {
    return this.repo.create({ name });
  }

  public async getAllByName(name: string, page: number, pageSize: number) {
    return this.repo.findLike(name, page, pageSize);
  }

  public async getById(id: number[] | number) {
    return this.repo.getById(id).then((res) => res[0]);
  }
}
