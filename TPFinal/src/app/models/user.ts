export class User {
    uid: string;
    nombre: string;
    apellido: string;
    edad: string
    dni: string
    obraSocial?: string
    email: string;
    password: string;
    especialidades?: [
        {
            descripcion: string;
            imgPath: string;
        }
    ];
    perfil1: string;
    perfil2: string;
    tipo: string;
    habilitado: boolean;
    emailVerified: boolean;
    agenda: {
        dias: [
            {
                nombre: string;
                mañana: boolean;
                tarde: boolean;
                noche: boolean;
            }
        ];
    };
    historiaClinica: {
        altura,
        peso,
        presion,
        temperatura,
        items: any[]
    };
}
