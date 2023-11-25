import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from '@/modules/candidate/entities/candidate.entity';
import { UserService } from '@/modules/user/user.service';
import { SpacesService } from '@/modules/spaces/spaces.service';
import { CandidateCreateDto } from '@/modules/candidate/dto/candidate.create.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>,
    private readonly userService: UserService,
    private readonly spaceService: SpacesService,
  ) {}

  public async createCandidate(data: CandidateCreateDto) {
    const candidate = this.candidateRepo.create();

    candidate.direction = data.direction;
    candidate.userData = await this.userService.createAdditional(data.data);

    await this.candidateRepo.save(candidate);

    await this.spaceService.addCandidate(candidate, data.spaceId);

    return this.getAll(data.spaceId);
  }

  public async get(candidateId: number) {
    const candidate = await this.candidateRepo.findOne({
      where: {
        id: candidateId,
      },
      relations: {
        userData: true,
        space: true,
      },
    });

    if (!candidate) {
      throw new HttpException(
        `Cna't find candidate with id: ${candidateId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return candidate;
  }

  public async getAll(spaceId: number) {
    const space = await this.spaceService.getSpaceById(spaceId);

    return await this.candidateRepo.find( {
      where: {
        space,
      },
    } );
  }
}
