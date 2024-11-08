import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let RegRequest = new Schema({
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
    
})

export default mongoose.model('RegRequest', RegRequest, 'zahtevi');