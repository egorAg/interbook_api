import { Interview } from '../types/interview';
import { InterviewModel } from '../../entities/models/interview.model';
import { CandidateMapper } from '../../../candidates/domain/mappers/candidate.mapper';
import { InterviewResultMapper } from './interview.result.mapper';
import { User } from '../../../user/types/user.type';

export class InterviewMapper {
  static toDomain(raw: InterviewModel): Interview {
    const res = new Interview();
    res.id = raw.id;
    if (raw.isResultPublished) res.isResultPublished = raw.isResultPublished;
    if (raw.template) res.template = raw.template;
    if (raw.candidate) res.candidate = CandidateMapper.toDomain(raw.candidate);
    if (res?.result?.length)
      res.result = raw.result.map((val) => InterviewResultMapper.toDomain(val));
    if (raw.date) res.date = raw.date;
    if (raw.user)
      res.user = {
        id: raw.user.id,
        login: raw.user.login,
      } as User;
    return res;
  }

  static toPersistence(raw: Interview): InterviewModel {
    const res = new InterviewModel();
    res.id = raw.id;
    res.isResultPublished = raw.isResultPublished;
    res.template = raw.template;
    res.candidate = CandidateMapper.toPersistence(raw.candidate);
    res.result = raw.result.map((val) =>
      InterviewResultMapper.toPersistence(val),
    );
    res.date = raw.date;
    return res;
  }
}
