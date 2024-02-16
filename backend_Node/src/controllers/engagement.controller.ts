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
        let nastavnik = req.body.nastavnik;
        let predmet = req.body.predmet;
        let angazovanje = {
            nastavnik: nastavnik,
            predmet: predmet
        }

        new Engagement(angazovanje).save().then(ok => {
            res.json({message: "ok"})
        }).catch(err=> {
            console.log(err)
        })
    }

}