import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let SubjectRequest = new Schema({
   imePredmeta: {
    type: String
   }, 
   korisnickoIme: {
    type:String
   }
})

export default mongoose.model('SubjectRequest', SubjectRequest, 'zahteviPredmeti');