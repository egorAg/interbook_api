import { CandidateModel } from '../../entities/models/candidate.model';
import { Candidate } from '../types/candidate';

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

    return res;
  }
}
