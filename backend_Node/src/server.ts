import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import requestRouter from './routes/regrequest.routes';
import engagementRouter from './routes/engagement.routes';
import schoolSubjectRouter from './routes/schoolsubject.routes';
import subjectRequestRouter from './routes/subjectrequest.routes';
import classRequestRouter from './routes/scheduleClass.routes';




const app = express();

// Increase payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/skola")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = express.Router()

router.use('/user', userRouter)

router.use('/requests', requestRouter)

router.use('/engagements', engagementRouter)

router.use('/schoolsubjects', schoolSubjectRouter)


router.use('/subjectrequests', subjectRequestRouter)

router.use('/classrequests', classRequestRouter)

app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));