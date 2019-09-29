import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AngabeService } from '../angabe/angabe.service';
import { Angabe } from '../angabe/model/angabe.entity';
import { Rezept } from './model/rezept.entity';
import { RezeptController } from './rezept.controller';
import { RezeptService } from './rezept.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rezept, Angabe], 'default')],
  providers: [RezeptService, AngabeService],
  controllers: [RezeptController],
})
export class RezeptModule { }
