import { Agenda } from "./agenda";

export class User {
    uid: string;
    nombre: string;
    apellido: string;
    edad: string
    dni: string
    obraSocial: string
    email: string;
    password: string;
    especialidad: string;
    perfil1: string;
    perfil2: string;
    tipo: string
    habilitado: boolean;
    emailVerified: boolean;
    agenda: Agenda;
}
