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

userRouter.route('/dodajPredmet').post(
    (req, res) => new UserController().dodajPredmet(req, res)
)

userRouter.route('/promeniIme').post(
    (req, res) => new UserController().promeniIme(req, res)
)


userRouter.route('/promeniPrezime').post(
    (req, res) => new UserController().promeniPrezime(req, res)
)


userRouter.route('/promeniAdresu').post(
    (req, res) => new UserController().promeniAdresu(req, res)
)


userRouter.route('/promeniImejl').post(
    (req, res) => new UserController().promeniImejl(req, res)
)


userRouter.route('/promeniKontaktTelefon').post(
    (req, res) => new UserController().promeniKontaktTelefon(req, res)
)


userRouter.route('/promeniTipSkole').post(
    (req, res) => new UserController().promeniTipSkole(req, res)
)

userRouter.route('/promeniRazred').post(
    (req, res) => new UserController().promeniRazred(req, res)
)


userRouter.route('/promeniProfilnuSliku').post(
    (req, res) => new UserController().promeniProfilnuSliku(req, res)
)
export default userRouter;