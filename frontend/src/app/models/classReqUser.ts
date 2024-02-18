import { Grade } from "./grade";
import User from "./user";

export class ClassReqUser {
    nastavnik: User = new User();
    ucenik: User = new User();
    predmet: string = "";
    pocetakCasa: string = "";
    krajCasa: string = "";
    tema: string = "";
    prosecnaOcena: number = 0;
    prihvacen: number = 0;
}