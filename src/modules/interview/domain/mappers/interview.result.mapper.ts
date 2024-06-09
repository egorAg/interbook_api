import { InterviewResultModel } from '../../entities/models/interview.result.model';
import { InterviewResult } from '../types/interview.result';
import { InterviewMapper } from './interview.mapper';

export class InterviewResultMapper {
  static toDomain(raw: InterviewResultModel): InterviewResult {
    const res = new InterviewResult();
    if (res.id) res.id = raw.id;
    if (res.interviewNote) res.interviewNote = raw.interviewNote;
    if (res.question) res.question = raw.question;
    if (res.rate) res.rate = raw.rate;
    if (res.interview) res.interview = InterviewMapper.toDomain(raw.interview);
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
