import { Auth } from '../../../../decorators/auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUsecase } from './create.usecase';
import { InterviewCreateDto } from '../../dto/interview.create.dto';
import { UserId } from '../../../../decorators/userid.decorator';
import { Interview } from '../../domain/types/interview';

@Auth
@ApiTags('Interview')
@Controller('interview')
export class CreateController {
  constructor(private readonly usecase: CreateUsecase) {}

  @ApiOperation({
    summary: 'Create new interview',
    description:
      'This handler creates the new one interview. If date not setted - by default is now',
  })
  @ApiOkResponse({
    type: Interview,
    status: HttpStatus.CREATED,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  execute(@Body() dto: InterviewCreateDto, @UserId() userId: number) {
    return this.usecase.execute({ dto: dto, userId });
  }
}
