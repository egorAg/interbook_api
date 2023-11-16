import { UserDataDto } from "@/modules/auth/dto/user.data.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @ApiProperty({example: 'changeme'})
  login: string;

  @ApiProperty({example: 'changeme'})
  password: string;

  @ApiProperty({example: {
    name: 'Name',
      surname: 'Surname',
      email: 'Email'
    }})
  data: UserDataDto;
}
