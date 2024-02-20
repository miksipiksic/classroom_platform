import express from 'express';
import { GradeController } from '../controllers/grade.controller';
const gradeRouter = express.Router();

gradeRouter.route('/dodajOcenu').post(
    (req, res) => new GradeController().dodajOcenu(req, res)
)

gradeRouter.route('/dohvatiOcene').post(
    (req, res) => new GradeController().dohvatiOcene(req, res)
)




export default gradeRouter;