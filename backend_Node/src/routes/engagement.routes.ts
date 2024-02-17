import express from 'express';
import { EngagementController } from '../controllers/engagement.controller';
const engagementRouter = express.Router();

engagementRouter.route('/dodajAngazovanje').post(
    (req, res) => new EngagementController().dodajAngazovanje(req, res)
)

engagementRouter.route('/dohvatiAngazovanja').get(
    (req, res) => new EngagementController().dohvatiAngazovanja(req, res)
)
engagementRouter.route('/dodajPredmet').post(
    (req, res) => new EngagementController().dodajPredmet(req, res)
)

engagementRouter.route('/dodajAngazovanjeNastavnika').post(
    (req, res) => new EngagementController().dodajAngazovanjeNastavnika(req, res)
)





export default engagementRouter;