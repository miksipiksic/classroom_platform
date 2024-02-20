

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let SchoolClass = new Schema({
    nastavnik: {
    type: String
   }, 
   ucenik: {
    type:String
   },
   predmet: {
    type: String
   },
   pocetakCasa: {
    type:String
   },
   krajCasa: {
    type: String
   },
   tema: {
    type: String
   },
   odradjen: {
    type: Boolean
   }
})

export default mongoose.model('SchoolClass', SchoolClass, 'casovi');