import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TagCreateDto {
  @ApiProperty({
    name: 'name',
    description: 'Tag name',
    example: 'React',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
