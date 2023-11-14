import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserData } from './entities/user-data.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User, UserData])],
})
export class UserModule {}
