import { Angabe } from './angabe.model';

export interface IRezept {
    id: string;
    name: string;
    description: string;
    angaben: Angabe[];
    anleitung: string;
}

export class Rezept {
    public id: string;
    public name: string;
    public description: string;
    public angaben: Angabe[];
    public anleitung: string;

    constructor({ name, description, angaben, anleitung }: { name: string; description: string; angaben: Angabe[], anleitung: string }) {
        this.name = name;
        this.description = description;
        this.angaben = angaben;
        this.anleitung = anleitung;
    }
}