"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = req.body.type;
            user_1.default.findOne({ 'korisnickoIme': username, 'lozinka': password, 'tip': type }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.registerUcenik = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            let bezbedonosnoPitanje = req.body.bezbedonosnoPitanje;
            let odgovor = req.body.odgovor;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let pol = req.body.pol;
            let adresa = req.body.adresa;
            let kontaktTelefon = req.body.kontaktTelefon;
            let imejl = req.body.imejl;
            let profilnaSlika = req.body.profilnaSlika;
            let tipSkole = req.body.tipSkole;
            let razred = req.body.razred;
            let tip = req.body.tip;
            let ucenik = {
                korisnickoIme: korisnickoIme,
                lozinka: lozinka,
                bezbedonosnoPitanje: bezbedonosnoPitanje,
                odgovor: odgovor,
                ime: ime,
                prezime: prezime,
                pol: pol,
                adresa: adresa,
                kontaktTelefon: kontaktTelefon,
                imejl: imejl,
                profilnaSlika: profilnaSlika,
                tipSkole: tipSkole,
                razred: razred,
                tip: tip
            };
            new user_1.default(ucenik).save().then(ok => {
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.postojeciKorisnikIme = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.findOne({ korisnickoIme: korisnickoIme }).then(user => {
                res.json(user);
            }).catch(err => console.log(err));
        };
        this.postojeciKorisnikImejl = (req, res) => {
            let imejl = req.body.imejl;
            user_1.default.findOne({ imejl: imejl }).then(user => {
                res.json(user);
            }).catch(err => console.log(err));
        };
        this.nadjiLozinku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.findOne({ korisnickoIme: korisnickoIme }).then(user => {
                res.json(user === null || user === void 0 ? void 0 : user.lozinka);
            }).catch(err => console.log(err));
        };
        this.promeniLozinku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            user_1.default.updateOne({ korisnickoIme: korisnickoIme }, { lozinka: lozinka }).then(users => {
                res.json({ message: "ok" });
            }).catch((err) => {
                console.log(err);
                res.json({ message: "fail" });
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.findOne({ korisnickoIme: korisnickoIme }).then(user => {
                res.json(user);
            }).catch(err => console.log(err));
        };
    }
}
exports.UserController = UserController;