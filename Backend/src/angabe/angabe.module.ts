import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AngabeController } from './angabe.controller';
import { AngabeService } from './angabe.service';
import { Angabe } from './model/angabe.entity';

@Module({
  controllers: [AngabeController],
  imports: [TypeOrmModule.forFeature([Angabe])],
  providers: [AngabeService]
})
export class AngabeModule { }
