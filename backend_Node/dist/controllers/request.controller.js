"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const regrequest_1 = __importDefault(require("../models/regrequest"));
class RequestController {
    constructor() {
        this.registerNastavnik = (req, res) => {
            console.log("u register Nastavnik");
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
            let biografija = req.body.biografija;
            let predmet = req.body.predmet;
            let uzrast = req.body.uzrast;
            let upoznavanjeSaSajtom = req.body.upoznavanjeSaSajtom;
            let tip = req.body.tip;
            let prihvacen = 0;
            let nastavnik = {
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
                biografija: biografija,
                predmet: predmet,
                uzrast: uzrast,
                upoznavanjeSaSajtom: upoznavanjeSaSajtom,
                tip: tip,
                prihvacen: prihvacen
            };
            new regrequest_1.default(nastavnik).save().then(ok => {
                console.log("uspesno ubaceno");
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
            });
        };
        this.dohvatiZahteve = (req, res) => {
            regrequest_1.default.find({}).then(reqs => {
                res.json(reqs);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.postojeciKorisnikIme = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            regrequest_1.default.findOne({ korisnickoIme: korisnickoIme }).then(rqst => {
                res.json(rqst);
            }).catch(err => console.log(err));
        };
        this.postojeciKorisnikImejl = (req, res) => {
            let imejl = req.body.imejl;
            regrequest_1.default.findOne({ imejl: imejl }).then(rqst => {
                res.json(rqst);
            }).catch(err => console.log(err));
        };
        this.obrisiZahtev = (req, res) => {
            regrequest_1.default.deleteOne({ korisnickoIme: req.body.korisnickoIme }).then(ok => {
                res.json({ message: "ok" });
                console.log(req.body.korisnickoIme);
            }).catch((err) => {
                console.log(err);
                res.json({ message: "fail" });
            });
        };
    }
}
exports.RequestController = RequestController;
