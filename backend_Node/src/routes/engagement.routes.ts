import express from 'express';
import { EngagementController } from '../controllers/engagement.controller';
const engagementRouter = express.Router();

engagementRouter.route('/dodajAngazovanje').post(
    (req, res) => new EngagementController().dodajAngazovanje(req, res)
)

engagementRouter.route('/dohvatiAngazovanja').get(
    (req, res) => new EngagementController().dohvatiAngazovanja(req, res)
)


export default engagementRouter;