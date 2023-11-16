import { ApiProperty } from "@nestjs/swagger";

export class UserDataDto {
  @ApiProperty({example: 'Name'})
  name: string;

  @ApiProperty({example: 'Surname'})
  surname: string;

  @ApiProperty({example: 'email'})
  email: string;
}
