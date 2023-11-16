import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { enteties } from './config/entities';
import { UserModule } from '@/modules/user/user.module';
import configuration from '@/config/configuration';
import { AuthModule } from '@/modules/auth/auth.module';
import { CryptoModule } from '@/modules/crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.host') ?? 'localhost',
          port: config.get<number>('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          synchronize: true,
          entities: enteties,
          retryAttempts: 3,
          retryDelay: 5000,
          autoLoadEntities: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    CryptoModule,
  ],
  providers: [],
})
export class AppModule {}
