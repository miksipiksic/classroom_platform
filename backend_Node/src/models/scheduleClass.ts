import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ScheduleClass = new Schema({
    nastavnik: {
        type: String
    },
    ucenik: {
        type: String
    },
    predmet: {
        type: String
    },
    pocetakCasa: {
        type: String
    },
    krajCasa: {
        type: String
    },
    tema: {
        type: String
    },
    prihvacen: {
        type:Number
    },
    obrazlozenje: {
        type:String
    }
})

export default mongoose.model('ScheduleClass', ScheduleClass, 'casoviZahtevi');
