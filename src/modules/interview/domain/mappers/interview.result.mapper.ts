import { InterviewResult } from '../types/interview.result';
import { InterviewResultModel } from '../../entities/models/interview.result.model';
import { InterviewMapper } from './interview.mapper';

export class InterviewResultMapper {
  static toDomain(raw: InterviewResultModel): InterviewResult {
    const res = new InterviewResult();
    res.id = raw.id;
    res.interviewNote = raw.interviewNote;
    res.question = raw.question;
    res.rate = raw.rate;
    res.interview = InterviewMapper.toDomain(raw.interview);
    return res;
  }

  static toPersistence(raw: InterviewResult): InterviewResultModel {
    const res = new InterviewResultModel();
    res.rate = raw.rate;
    res.interviewNote = raw.interviewNote;
    res.id = raw.id;
    res.question = raw.question;
    res.interview = InterviewMapper.toPersistence(raw.interview);
    return res;
  }
}
