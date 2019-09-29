import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Angabe } from '../../angabe/model/angabe.entity';

@Entity() // Gericht --> Zum essen
export class Rezept {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('text')
    public name: string;

    @Column('text')
    public description: string;

    @ManyToMany(() => Angabe)
    @JoinTable({ name: 'rezept_angaben_angabe' })
    public angaben: Angabe[];

    @Column('text')
    public anleitung: string;

}