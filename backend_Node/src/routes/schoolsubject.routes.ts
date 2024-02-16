import express from 'express';
import { SchoolSubjectController } from '../controllers/schoolsubject.controller';
const schoolSubjectRouter = express.Router();

schoolSubjectRouter.route('/dodajPredmet').post(
    (req, res) => new SchoolSubjectController().dodajPredmet(req, res)
)

schoolSubjectRouter.route('/dohvatiPredmete').get(
    (req, res) => new SchoolSubjectController().dohvatiPredmete(req, res)
)


export default schoolSubjectRouter;