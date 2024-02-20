import express from 'express';
import { RegRequestController } from '../controllers/regrequest';
const requestRouter = express.Router();

requestRouter.route('/registerNastavnik').post(
    (req, res) => new RegRequestController().registerNastavnik(req, res)
)

requestRouter.route('/dohvatiZahteve').get(
    (req, res) => new RegRequestController().dohvatiZahteve(req, res)
)

requestRouter.route('/postojeciKorisnikIme').post(
    (req, res) => new RegRequestController().postojeciKorisnikIme(req, res)
)

requestRouter.route('/postojeciKorisnikImejl').post(
    (req, res) => new RegRequestController().postojeciKorisnikImejl(req, res)
)

requestRouter.route('/obrisiZahtev').post(
    (req, res) => new RegRequestController().obrisiZahtev(req, res)
)

requestRouter.route('/dodajPredmet').post(
    (req, res) => new RegRequestController().dodajPredmet(req, res)
)



export default requestRouter;