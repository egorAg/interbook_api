import { QuestionModel } from 'src/modules/questions/entities/models/question.model';
import { TemplateEntity } from '../../templates/entities/models/template.entity';
import { Candidate } from '../../candidates/domain/types/candidate';

export type User = {
  id: number;
  login: string;
  password: string;
  refreshToken: string;
  questions: QuestionModel[];
  templates: TemplateEntity[];
  candidates: Candidate[];
};
