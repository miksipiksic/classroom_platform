"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    bezbedonosnoPitanje: {
        type: String
    },
    odgovor: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String,
        maxlength: 1
    },
    adresa: {
        type: String
    },
    kontaktTelefon: {
        type: String
    },
    imejl: {
        type: String
    },
    profilnaSlika: {
        type: String
    },
    tipSkole: {
        type: String
    },
    razred: {
        type: Number
    },
    biografija: {
        type: String
    },
    predmet: {
        type: [String]
    },
    uzrast: {
        type: [String]
    },
    upoznavanjeSaSajtom: {
        type: String
    },
    tip: {
        type: Number
    },
    prihvacen: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('User', User, 'korisnici');
