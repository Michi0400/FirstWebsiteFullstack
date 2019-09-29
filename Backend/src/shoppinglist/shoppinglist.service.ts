import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ShoppingItemNew } from './model/shoppingitem.entity';

@Injectable()
export class ShoppinglistService {

    constructor(
        @InjectRepository(ShoppingItemNew)
        private readonly shoppingItemRepository: Repository<ShoppingItemNew>,
    ) { }

    public async getAll() {
        return this.shoppingItemRepository.find();
    }

    public async create(shoppingItem: ShoppingItemNew) {
        const q = new ShoppingItemNew();
        q.menge = shoppingItem.menge;
        q.einheit = shoppingItem.einheit;
        q.name = shoppingItem.name;
        return this.shoppingItemRepository.save(q);
    }

    public async delete(id): Promise<DeleteResult> {
        return await this.shoppingItemRepository.delete(id);
    }

    public async update(id: string, shoppingItem: ShoppingItemNew): Promise<UpdateResult> {
        return await this.shoppingItemRepository.update(id, shoppingItem);
    }
}
