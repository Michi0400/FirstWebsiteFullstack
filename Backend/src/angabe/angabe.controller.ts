import { Controller, Get, Post, Query } from '@nestjs/common';
import { AngabeService } from './angabe.service';

@Controller('angabe')
export class AngabeController {

    constructor(private readonly angabenService: AngabeService) {
    }

    @Get('/')
    public async getAll(
        @Query('q') q: string
    ) {
        return this.angabenService.getAll(q);
    }

    @Post('/')
    public async create() {
        this.angabenService.create()
    }
}
