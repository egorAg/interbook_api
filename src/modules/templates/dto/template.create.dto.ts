import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TemplateCreateDto {
  @ApiProperty({
    type: 'string',
    example: 'Junior frontend',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
