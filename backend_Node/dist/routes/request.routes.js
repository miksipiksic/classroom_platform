"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_1 = require("../controllers/request.controller");
const requestRouter = express_1.default.Router();
requestRouter.route('/registerNastavnik').post((req, res) => new request_controller_1.RequestController().registerNastavnik(req, res));
requestRouter.route('/dohvatiZahteve').get((req, res) => new request_controller_1.RequestController().dohvatiZahteve(req, res));
requestRouter.route('/postojeciKorisnikIme').post((req, res) => new request_controller_1.RequestController().postojeciKorisnikIme(req, res));
requestRouter.route('/postojeciKorisnikImejl').post((req, res) => new request_controller_1.RequestController().postojeciKorisnikImejl(req, res));
exports.default = requestRouter;
