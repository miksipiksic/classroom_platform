"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let type = req.body.type;
            user_1.default.findOne({ 'korisnickoIme': username, 'lozinka': password, 'tip': type }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.UserController = UserController;
