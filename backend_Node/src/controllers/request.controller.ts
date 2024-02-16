import * as express from 'express';
import RegRequest from '../models/regrequest'
export class RequestController {

    registerNastavnik = (req: express.Request, res: express.Response) => {
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
        }

        new RegRequest(nastavnik).save().then(ok => {
            console.log("uspesno ubaceno");
            res.json({message: "ok"})
        }).catch(err=> {
            console.log(err)
        })
    }

    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        RegRequest.find({}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    postojeciKorisnikIme = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        RegRequest.findOne( {korisnickoIme: korisnickoIme  }).then(
                rqst=>{
                    res.json(rqst)
                }
            ).catch(err=>console.log(err))
    }

    postojeciKorisnikImejl = (req: express.Request, res: express.Response) => {
        
        let imejl = req.body.imejl;

        RegRequest.findOne( {imejl: imejl  }).then(
            rqst=>{
                res.json(rqst)
            }
        ).catch(err=>console.log(err))
    }

    obrisiZahtev = (req: express.Request, res: express.Response) => {
        console.log("brisanje")
        RegRequest.deleteOne({korisnickoIme: req.body.korisnickoIme}).then(
            ok => {
                res.json({message: "ok"})
            }
        ).catch(err=> console.log(err))
    }

}