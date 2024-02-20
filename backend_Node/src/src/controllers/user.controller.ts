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
    registerNastavnik = (req: express.Request, res: express.Response) => {
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
        let tip = 2;
        let upoznavanjeSaSajtom = req.body.upoznavanjeSaSajtom;
        let prihvacen = req.body.prihvacen;
        
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
            biografija : biografija,
            predmet: predmet,
            uzrast: uzrast,
            upoznavanjeSaSajtom: upoznavanjeSaSajtom,
            prihvacen: prihvacen,
            tip: tip
        }

        console.log("dodavanje u korisnike");

        new User(nastavnik).save().then(ok => {
            res.json({message: "ok"})
        }).catch(err=> {
            console.log(err)
        })
    }

    
    postojeciKorisnikIme = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        User.findOne( {korisnickoIme: korisnickoIme  }).then(
                user=>{
                    res.json(user)
                }
            ).catch(err=>console.log(err))
    }

    postojeciKorisnikImejl = (req: express.Request, res: express.Response) => {
        
        let imejl = req.body.imejl;

        User.findOne( {imejl: imejl  }).then(
            user=>{
                res.json(user)
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
            res.json({message: "fail"})
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

    dohvatiUcenike = (req: express.Request, res: express.Response) => {
            let tip = 1;
        
            User.find({tip: tip}).then(
                users=>{
                    res.json(users)
                }
            ).catch(err=>console.log(err))
    }
    dohvatiNastavnike = (req: express.Request, res: express.Response) => {
        let tip = 2;
    
        User.find({tip: tip}).then(
            users=>{
                res.json(users)
            }
        ).catch(err=>console.log(err))
    }

dodajPredmet = (req: express.Request, res: express.Response)=>{
    User.updateOne({ korisnickoIme: req.body.korisnickoIme },
        { $addToSet: { predmet: req.body.imePredmeta } }).then(ok=>{
        res.json({message: "ok" });
        console.log(req.body.korisnickoIme);
    }).catch((err)=>{
        console.log(err)
        res.json({message: "fail"})
    })
}


    promeniIme = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { ime: req.body.ime} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniPrezime = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { prezime: req.body.prezime} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniAdresu = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { adresa: req.body.adresa} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniImejl = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { imejl: req.body.imejl} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniKontaktTelefon = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { kontaktTelefon: req.body.kontaktTelefon} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniTipSkole = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { tipSkole: req.body.tipSkole} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniRazred = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { razred: req.body.razred} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniProfilnuSliku = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { profilnaSlika: req.body.profilnaSlika} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    promeniUzrast = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { uzrast: req.body.uzrast} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }


    promeniPredmete = (req: express.Request, res: express.Response)=>{
        User.updateOne({ korisnickoIme: req.body.korisnickoIme },
            { $set: { predmet: req.body.predmet} }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

}