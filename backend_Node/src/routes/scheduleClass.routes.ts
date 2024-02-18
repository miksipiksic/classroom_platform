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

classRequestRouter.route('odbijZahtev').post(
    (req, res) => new ScheduleClassController().odbijZahtev(req, res)
)

classRequestRouter.route('prihvatiZahtev').post(
    (req, res) => new ScheduleClassController().prihvatiZahtev(req, res)
)

export default classRequestRouter;