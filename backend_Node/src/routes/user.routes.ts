import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)


userRouter.route('/registerUcenik').post(
    (req, res) => new UserController().registerUcenik(req, res)
)

userRouter.route('/nadjiLozinku').post(
    (req, res) => new UserController().nadjiLozinku(req, res)
)

userRouter.route('/promeniLozinku').post(
    (req, res) => new UserController().promeniLozinku(req, res)
)

userRouter.route('/postojeciKorisnikIme').post(
    (req, res) => new UserController().postojeciKorisnikIme(req, res)
)

userRouter.route('/postojeciKorisnikImejl').post(
    (req, res) => new UserController().postojeciKorisnikImejl(req, res)
)

userRouter.route('/dohvatiKorisnika').post(
    (req, res) => new UserController().dohvatiKorisnika(req, res)
)

userRouter.route('/dohvatiUcenike').get(
    (req, res) => new UserController().dohvatiUcenike(req, res)
)
userRouter.route('/dohvatiNastavnike').get(
    (req, res) => new UserController().dohvatiNastavnike(req, res)
)


userRouter.route('/registerNastavnik').post(
    (req, res) => new UserController().registerNastavnik(req, res)
)

export default userRouter;