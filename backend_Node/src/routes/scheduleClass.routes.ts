import express from 'express';
import { ScheduleClassController } from '../controllers/scheduleClass.controller';
const classRequestRouter = express.Router();

classRequestRouter.route('/dodajZahtev').post(
    (req, res) => new ScheduleClassController().dodajZahtev(req, res)
)

classRequestRouter.route('/dohvatiZahteve').get(
    (req, res) => new ScheduleClassController().dohvatiZahteve(req, res)
)

classRequestRouter.route('/obrisiZahtev').post(
    (req, res) => new ScheduleClassController().obrisiZahtev(req, res)
)


export default classRequestRouter;