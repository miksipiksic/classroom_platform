import express from 'express';
import { RequestController } from '../controllers/request.controller';
const requestRouter = express.Router();

requestRouter.route('/registerNastavnik').post(
    (req, res) => new RequestController().registerNastavnik(req, res)
)

requestRouter.route('/dohvatiZahteve').get(
    (req, res) => new RequestController().dohvatiZahteve(req, res)
)


export default requestRouter;