export interface AngabeDTO {
    id: string;
    name: string;
    menge: number;
    einheit: string;
}
export class AngabeC implements AngabeDTO {
    id: string;
    name: string;
    menge: number;
    einheit: string;


}

export class AngabeH {
    questionNewId: string;
    angabeId: string;
    amount: number;
    einheit: string;

}