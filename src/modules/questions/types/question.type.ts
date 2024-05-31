import { User } from '../../user/types/user.type';

export type Question = {
  id: number;
  name: string;
  hint: string | undefined;
  creator: User | undefined;
};
