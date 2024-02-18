import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Grade = new Schema({
    nastavnik: {
        type: String
    },
    ucenik: {
        type: String
    },
    predmet: {
        type: String
    },
    ocena: {
        type: Number
    },
    komentar: {
        type:String
    }
})

export default mongoose.model('Grade', Grade, 'ocene');