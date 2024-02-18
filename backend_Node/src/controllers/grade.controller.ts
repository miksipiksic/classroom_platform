import * as express from 'express';
import Grade from '../models/grade';
export class GradeController {

    dohvatiOcene = (req: express.Request, res: express.Response) => {
        let ucenik = req.body.ucenik;
        Grade.find({ucenik: ucenik}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajOcenu = (req: express.Request, res: express.Response) => {
        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let ocena = req.body.ocena;
        let predmet = req.body.predmet;
        let komentar = req.body.komentar;

        let grade = {
            nastavnik: nastavnik,
            ucenik: ucenik,
            ocena: ocena,
            predmet: predmet,
            komentar: komentar
        }

        new Grade(grade).save().then(ok=>{
            res.json({message: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    

}