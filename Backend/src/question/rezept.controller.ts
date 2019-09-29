import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RezeptDTO } from './model/rezept.dto';
import { Rezept } from "./model/rezept.entity";
import { RezeptService } from './rezept.service';

@Controller('rezept')
export class RezeptController {
  constructor(private readonly rezeptService: RezeptService) { }

  @Get('/')
  public async getAll() {
    return this.rezeptService.getAll();
  }

  @Get('/content/:id')
  public async getAllContent(@Param('id') id) {
    return this.rezeptService.getOne(id);
  }

  @Post('/')
  public async create(@Body() rezept: RezeptDTO) {
    return this.rezeptService.create(rezept);
  }

  @Delete('/:id')
  public async delete(@Param('id') id): Promise<any> {
    return this.rezeptService.delete(id);
  }

  @Put('/:id')
  public async update(
    @Body() rezept: Rezept,
    @Param('id') id,
  ): Promise<any> {
    return this.rezeptService.update(id, rezept);
  }
}
