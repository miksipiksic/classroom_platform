import express from 'express';
import { SubjectRequestController } from '../controllers/subjectrequest.controller';
const subjectRequestRouter = express.Router();

subjectRequestRouter.route('/dodajZahtev').post(
    (req, res) => new SubjectRequestController().dodajZahtev(req, res)
)

subjectRequestRouter.route('/dohvatiZahteve').get(
    (req, res) => new SubjectRequestController().dohvatiZahteve(req, res)
)

subjectRequestRouter.route('/obrisiZahtev').post(
    (req, res) => new SubjectRequestController().obrisiZahtev(req, res)
)


export default subjectRequestRouter;