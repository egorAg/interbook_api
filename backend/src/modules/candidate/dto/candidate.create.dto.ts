import { ApiProperty } from '@nestjs/swagger';
import { UserDataDto } from '@/modules/auth/dto/user.data.dto';

export class CandidateCreateDto {
  @ApiProperty({
    example: 'backend',
    required: true,
    description: `Specialization of the candidate`,
  })
  direction: string;

  @ApiProperty({
    example: 1,
    required: true,
    description:
      'Workspace ID (the candidate will be available only within this space)',
  })
  spaceId: number;

  @ApiProperty({
    type: UserDataDto,
    description: 'Candidate additional info',
  })
  data: UserDataDto;
}
