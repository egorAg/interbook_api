import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { UserDataSchema } from '@/schemas/userData.schema';
import { SpaceSchema } from '@/schemas/space.schema';

export const CandidateSchema: SchemaObject = {
  properties: {
    id: {
      example: 1,
      description: 'Candidate id',
    },
    direction: {
      example: 'HTML-developer',
    },
    userData: UserDataSchema,
    space: SpaceSchema,
  },
  example: {
    id: 1,
    direction: 'HTML-developer',
    userData: UserDataSchema.example,
    space: SpaceSchema.example,
  },
};
