import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateModel } from '../models/candidate.model';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from '../../dto/create.candidate.dto';
import { CandidateGradeEnum } from '../../types/candidate.grade.enum';
import { UserModel } from '../../../user/entities/models/user.model';

@Injectable()
export class CandidateRepository {
  constructor(
    @InjectRepository(CandidateModel)
    private readonly dataSource: Repository<CandidateModel>,
  ) {}

  public async create(dto: CreateCandidateDto, creatorId: number) {
    const candidate = new CandidateModel();
    candidate.name = dto.name;
    candidate.surname = dto.surname;
    candidate.specialty = dto.speciality;
    candidate.grade = dto.grade ?? CandidateGradeEnum.UNGRADED;
    if (dto.salary) candidate.salary = dto.salary;
    if (dto.experience) candidate.experience = dto.experience;
    candidate.createdBy = {
      id: creatorId,
    } as UserModel;
    candidate.interviews = [];

    await this.dataSource.save(candidate);

    return candidate;
  }

  public async getById(id: number) {
    return this.dataSource.findOne({
      where: {
        id: id,
      },
    });
  }

  public async getAllForCreator(userId: number) {
    return this.dataSource.find({
      where: {
        createdBy: {
          id: userId,
        },
      },
    });
  }

  public async remove(id: number) {
    await this.dataSource.delete({ id: id });
  }

  public async update(data: Partial<CandidateModel>) {
    delete data.interviews;
    await this.dataSource.update({ id: data.id }, data);
  }
}
