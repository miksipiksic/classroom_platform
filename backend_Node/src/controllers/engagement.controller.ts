import * as express from 'express';
import Engagement from '../models/engagement'
export class EngagementController {

    dohvatiAngazovanja = (req: express.Request, res: express.Response) => {
        Engagement.find({}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajAngazovanje = (req: express.Request, res: express.Response) => {
        let nastavnici = req.body.nastavnici;
        let predmet = req.body.predmet;
        let angazovanje = {
            nastavnici: nastavnici,
            predmet: predmet
        }

        new Engagement(angazovanje).save().then(ok => {
            res.json({message: "ok"})
        }).catch(err=> {
            console.log(err)
        })
    }

    dodajAngazovanjeNastavnika = (req: express.Request, res: express.Response) => {
        let nastavnik = req.body.nastavnik;
        let predmet = req.body.predmet;

        console.log("dodajNastavnika");
        console.log(predmet)
        console.log(nastavnik)

        Engagement.updateOne({ predmet: req.body.predmet },
            { $addToSet: { nastavnici: req.body.nastavnik } }).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.nastavnik);
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

    dodajPredmet = (req: express.Request, res: express.Response) => {
        
        let predmet = req.body.predmet;
        let angazovanje = {
            predmet: predmet
        }

        new Engagement(angazovanje).save().then(ok => {
            res.json({message: "ok"})
        }).catch(err=> {
            console.log(err)
        })

    }

}