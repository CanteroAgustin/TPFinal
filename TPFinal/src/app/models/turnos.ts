import { Especialidad } from "./especialidad";
import { User } from "./user";

export class Turnos {
    uid: string;
    dia: string;
    mes: string;
    diaNombre: string;
    paciente: User;
    especialista: User;
    hora: string;
    especialidad: Especialidad;
    especialistaUid: string;
    estado: string;
    diagnostico: string;
    reseña: string;
    calificacion: string;
    motivoCancelacion: string;
    motivoRechazo: string;
}
