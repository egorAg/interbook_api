import { QuestionModel } from 'src/modules/questions/entities/models/question.model';

export type User = {
  id: number;
  login: string;
  password: string;
  refreshToken: string;
  questions: QuestionModel[];
};
