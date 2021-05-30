export interface Dias {
    nombre: string;
    mañana: boolean;
    tarde: boolean;
    noche: boolean;
}

export class Agenda {
    agenda:{
        dias: [
            {
                nombre: string;
                mañana: boolean;
                tarde: boolean;
                noche: boolean;
            }
        ];
    }
}
