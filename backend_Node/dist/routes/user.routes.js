"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/registerUcenik').post((req, res) => new user_controller_1.UserController().registerUcenik(req, res));
userRouter.route('/nadjiLozinku').post((req, res) => new user_controller_1.UserController().nadjiLozinku(req, res));
userRouter.route('/promeniLozinku').post((req, res) => new user_controller_1.UserController().promeniLozinku(req, res));
userRouter.route('/postojeciKorisnikIme').post((req, res) => new user_controller_1.UserController().postojeciKorisnikIme(req, res));
userRouter.route('/postojeciKorisnikImejl').post((req, res) => new user_controller_1.UserController().postojeciKorisnikImejl(req, res));
userRouter.route('/dohvatiKorisnika').post((req, res) => new user_controller_1.UserController().dohvatiKorisnika(req, res));
exports.default = userRouter;
