import User from "./user";

export class SchoolClassUser {
    nastavnik: string = "";
    ucenik: User = new User();
    predmet: string = "";
    pocetakCasa: Date = new Date();
    krajCasa: string = "";
    tema: string = "";
    odradjen: boolean = false;
}