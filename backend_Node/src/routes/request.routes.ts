import express from 'express';
import { RequestController } from '../controllers/request.controller';
const requestRouter = express.Router();

requestRouter.route('/registerNastavnik').post(
    (req, res) => new RequestController().registerNastavnik(req, res)
)

requestRouter.route('/dohvatiZahteve').get(
    (req, res) => new RequestController().dohvatiZahteve(req, res)
)

requestRouter.route('/postojeciKorisnikIme').post(
    (req, res) => new RequestController().postojeciKorisnikIme(req, res)
)

requestRouter.route('/postojeciKorisnikImejl').post(
    (req, res) => new RequestController().postojeciKorisnikImejl(req, res)
)



export default requestRouter;