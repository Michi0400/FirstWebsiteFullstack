import { AngabeDTO } from "./angabe.dto";

export interface RezeptDTO {
    name: string;

    description: string;

    angaben: AngabeDTO[];

    anleitung: string;
}