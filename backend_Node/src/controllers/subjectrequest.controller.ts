import * as express from 'express';
import SubjectRequest from '../models/subjectrequest'
export class SubjectRequestController {

    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        SubjectRequest.find({}).then(reqs=>{
            res.json(reqs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    dodajZahtev = (req: express.Request, res: express.Response) => {
        let imePredmeta = req.body.imePredmeta;
        let korisnickoIme = req.body.korisnickoIme;

        console.log(req.body.imePredmeta)
        console.log(req.body.korisnickoIme)

        let zahtev = {
            imePredmeta: imePredmeta,
            korisnickoIme: korisnickoIme
        }

        new SubjectRequest(zahtev).save().then(ok=>{
            res.json({message: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    obrisiZahtev = (req: express.Request, res: express.Response)=>{
        SubjectRequest.deleteOne({korisnickoIme: req.body.korisnickoIme, imePredmeta: req.body.imePredmeta}).then(ok=>{
            res.json({message: "ok" });
            console.log(req.body.korisnickoIme);
            console.log(req.body.imePredmeta)
        }).catch((err)=>{
            console.log(err)
            res.json({message: "fail"})
        })
    }

}