import express from 'express';
import { SchoolClassController } from '../controllers/schoolClass.controller';
const classRouter = express.Router();

classRouter.route('/dodajCas').post(
    (req, res) => new SchoolClassController().dodajCas(req, res)
)

classRouter.route('/dohvatiCasove').get(
    (req, res) => new SchoolClassController().dohvatiCasove(req, res)
)

classRouter.route('/obrisiCas').post(
    (req, res) => new SchoolClassController().obrisiCas(req, res)
)


export default classRouter;