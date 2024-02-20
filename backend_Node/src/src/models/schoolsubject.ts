import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let SchoolSubject = new Schema({
   imePredmeta: {
    type: String
   }
})

export default mongoose.model('SchoolSubject', SchoolSubject, 'predmeti');