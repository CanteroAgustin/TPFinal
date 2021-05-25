export interface Dias {
    nombre: string;
    mañana: boolean;
    tarde: boolean;
    noche: boolean;
}

export class Agenda {
    dias: Dias[] = [];
}
