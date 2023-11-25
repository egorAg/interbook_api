import { Module } from '@nestjs/common';
import { KeyStorageService } from './keyStorage.service';
import { ConfigModule } from '@nestjs/config';
import { KeyStorageConnectorService } from './keyStorage.connector.service';

@Module({
  imports: [ConfigModule],
  providers: [KeyStorageService, KeyStorageConnectorService],
  exports: [KeyStorageService],
})
export class KeyStorageModule {}
