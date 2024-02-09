import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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
    }
    
})

export default mongoose.model('User', User, 'korisnici');