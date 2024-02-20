import * as express from 'express';
import SchoolClass from '../models/schoolClass';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
export class SchoolClassController {
    

    dohvatiCasove = (req: express.Request, res: express.Response) => {
        SchoolClass.find({}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajCas = (req: express.Request, res: express.Response) => {
        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let predmet = req.body.predmet;
        let pocetakCasa = req.body.pocetakCasa;
        let krajCasa = req.body.krajCasa;
        let tema = req.body.tema;
        let odradjen = req.body.odradjen;

        let zahtev = {
            nastavnik: nastavnik,
            ucenik: ucenik,
            predmet: predmet, 
            pocetakCasa: pocetakCasa,
            krajCasa: krajCasa,
            tema: tema,
            odradjen: odradjen
        }

        new SchoolClass(zahtev).save().then(ok=>{
            res.json({message: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    obrisiCas = (req: express.Request, res: express.Response)=>{
        SchoolClass.deleteOne({nastavnik: req.body.nastavnik,
             predmet: req.body.predmet, ucenik: req.body.ucenik,
            pocetakCasa: req.body.pocetakCasa, krajCasa: req.body.krajCasa, tema: req.body.tema, odradjen: req.body.odradjen}).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
            console.log(req.body.imePredmeta)
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    odradiCas = (req: express.Request, res: express.Response)=>{
        SchoolClass.updateOne({nastavnik: req.body.nastavnik,
            pocetakCasa: req.body.pocetakCasa},
            {$set: {odradjen: true}} ).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
            console.log(req.body.imePredmeta)
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

}