import { Module } from '@nestjs/common';
import { UserModule } from "@/modules/user/user.module";
import { SpacesController } from "@/modules/spaces/spaces.controller";
import { SpacesService } from "@/modules/spaces/spaces.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Space } from "@/modules/spaces/entities/space.entity";
import { CryptoModule } from "@/modules/crypto/crypto.module";
import { KeyStorageModule } from "@/services/keyStorage/keyStorage.module";

@Module({
  providers: [SpacesService],
  controllers: [SpacesController],
  imports: [
      TypeOrmModule.forFeature([Space]),
      UserModule,
      CryptoModule,
      KeyStorageModule
  ]
})
export class SpacesModule {}
