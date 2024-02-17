import * as express from 'express';
import SchoolSubject from '../models/schoolsubject'
export class SchoolSubjectController {

    dohvatiPredmete = (req: express.Request, res: express.Response) => {
        SchoolSubject.find({}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajPredmet = (req: express.Request, res: express.Response) => {
        let imePredmeta = req.body.imePredmeta;
        console.log(req.body.imePredmeta);
        let predmet = {
            imePredmeta: imePredmeta
        }
        new SchoolSubject(predmet).save().then(ok=>{
            res.json({message: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

}