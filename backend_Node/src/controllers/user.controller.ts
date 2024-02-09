import * as express from 'express';
import User from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let type = req.body.type

        User.findOne({ 'korisnickoIme': username, 'lozinka': password, 'tip': type }, (err: any, user: any) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    registerUcenik = (req: express.Request, res: express.Response) => {
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
        }

        new User(ucenik).save().then(ok => {
            res.json({message: "ok"})
        }).catch(err=> {
            console.log(err)
        })
    }

    
    postojeciKorisnikIme = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOne( {korisnickoIme: korisnickoIme  }).then(
                user=>{
                    res.json({message: "found"})
                }
            ).catch(err=>console.log(err))
    }

    postojeciKorisnikImejl = (req: express.Request, res: express.Response) => {
        
        let imejl = req.body.imejl;

        User.findOne( {imejl: imejl  }).then(
            user=>{
                res.json({message: "found"})
            }
        ).catch(err=>console.log(err))
    }

    nadjiLozinku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOne({korisnickoIme: korisnickoIme}).then(
            user=>{
                res.json(user?.lozinka)
            }
        ).catch(err=>console.log(err))
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        User.updateOne({korisnickoIme: korisnickoIme},
            {lozinka: lozinka}).then(users =>{
            res.json({message: "ok"})
        }).catch((err)=>{
            console.log(err)
            res.json({message: "Fail"})
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        
            User.findOne({korisnickoIme: korisnickoIme}).then(
                user=>{
                    res.json(user)
                }
            ).catch(err=>console.log(err))
    }
}