import { CandidateModel } from '../../entities/models/candidate.model';
import { Candidate } from '../types/candidate';
import { InterviewMapper } from '../../../interview/domain/mappers/interview.mapper';

export class CandidateMapper {
  static toDomain(raw: CandidateModel): Candidate {
    const res = new Candidate();
    res.id = raw.id;
    res.name = raw.name;
    res.surname = raw.surname;
    res.specialty = raw.specialty;
    res.grade = raw.grade;
    if (raw.salary) res.salary = raw.salary;
    if (raw.experience) res.experience = raw.experience;
    if (raw.createdBy) res.createdBy = raw.createdBy;
    if (raw.createdAt) res.createdAt = raw.createdAt;
    if (raw.updatedAt) res.updatedAt = raw.updatedAt;
    if (raw.interviews)
      res.interviews = raw.interviews.map((val) =>
        InterviewMapper.toDomain(val),
      );

    return res;
  }

  static toPersistence(raw: Candidate): CandidateModel {
    const res = new CandidateModel();

    res.id = raw.id;
    res.name = raw.name;
    res.surname = raw.surname;
    res.specialty = raw.specialty;
    res.grade = raw.grade;
    if (raw.salary) res.salary = raw.salary;
    if (raw.experience) res.experience = raw.experience;
    if (raw.createdBy) res.createdBy = raw.createdBy;
    if (raw.createdAt) res.createdAt = raw.createdAt;
    if (raw.updatedAt) res.updatedAt = raw.updatedAt;
    if (raw.interviews)
      res.interviews = raw.interviews.map((val) =>
        InterviewMapper.toPersistence(val),
      );

    return res;
  }
}
