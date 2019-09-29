import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Angabe {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;
}