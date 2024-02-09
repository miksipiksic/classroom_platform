import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import requestRouter from './routes/request.routes';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/skola")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = express.Router()

router.use('/user', userRouter)

router.use('/request', requestRouter)



app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));