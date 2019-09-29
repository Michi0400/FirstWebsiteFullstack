import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingItemNew {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public menge: number;

    @Column()
    public einheit: string;

    @Column()
    public name: string;
}