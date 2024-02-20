import * as express from 'express';
import ScheduleClass from '../models/scheduleClass';
export class ScheduleClassController {

    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        ScheduleClass.find({}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajZahtev = (req: express.Request, res: express.Response) => {
        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let predmet = req.body.predmet;
        let pocetakCasa = req.body.pocetakCasa;
        let krajCasa = req.body.krajCasa;
        let tema = req.body.tema;
        let prihvacen = 0;

        let zahtev = {
            nastavnik: nastavnik,
            ucenik: ucenik,
            predmet: predmet, 
            pocetakCasa: pocetakCasa,
            krajCasa: krajCasa,
            tema: tema,
            prihvacen: prihvacen
        }

        new ScheduleClass(zahtev).save().then(ok=>{
            res.json({message: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    obrisiZahtev = (req: express.Request, res: express.Response)=>{
        ScheduleClass.deleteOne({nastavnik: req.body.nastavnik,
            pocetakCasa: req.body.pocetakCasa, }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
            console.log(req.body.imePredmeta)
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    prihvatiZahtev = (req: express.Request, res: express.Response)=>{
        ScheduleClass.updateOne({nastavnik: req.body.nastavnik,
             predmet: req.body.predmet, ucenik: req.body.ucenik,
            pocetakCasa: req.body.pocetakCasa, krajCasa: req.body.krajCasa, tema: req.body.tema, prihvacen: 0}, 
            {$set: {prihvacen: 1}} ).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
            console.log(req.body.imePredmeta)
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    odbijZahtev = (req: express.Request, res: express.Response)=>{
        
        ScheduleClass.updateOne({nastavnik: req.body.nastavnik,
             predmet: req.body.predmet, ucenik: req.body.ucenik,
            pocetakCasa: req.body.pocetakCasa, krajCasa: req.body.krajCasa, tema: req.body.tema, prihvacen: 0}, 
            {$set: {prihvacen: 2, obrazlozenje: req.body.obrazlozenje}} ).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
            console.log(req.body.imePredmeta)
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }


}