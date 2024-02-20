import mongoose from 'mongoose'
import SchoolSubject from './schoolsubject';
import User from './user';

const Schema = mongoose.Schema;

let Engagement = new Schema({
   predmet: {
    type: String
   },
   nastavnici: {
    type: [String]
   }
})

export default mongoose.model('Engagement', Engagement, 'angazovanja');