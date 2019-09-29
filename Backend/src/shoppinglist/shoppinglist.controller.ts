import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShoppingItemNew } from './model/shoppingitem.entity';
import { ShoppinglistService } from "./shoppinglist.service";

@Controller('shoppinglist')
export class ShoppinglistController {
    constructor(private readonly shoppingListService: ShoppinglistService) { }

    @Get('/')
    public async getAll() {
        return this.shoppingListService.getAll();
    }

    @Post('/')
    public async create(
        @Body() shoppingItem: ShoppingItemNew
    ) {
        return this.shoppingListService.create(shoppingItem)
    }

    @Delete('/:id')
    public async delete(@Param('id') id): Promise<any> {
        return this.shoppingListService.delete(id);
    }

    @Put('/:id')
    public async update(@Body() shoppingItem: ShoppingItemNew, @Param('id') id): Promise<any> {
        return this.shoppingListService.update(id, shoppingItem)
    }
}
