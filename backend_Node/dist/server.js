"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const regrequest_routes_1 = __importDefault(require("./routes/regrequest.routes"));
const engagement_routes_1 = __importDefault(require("./routes/engagement.routes"));
const schoolsubject_routes_1 = __importDefault(require("./routes/schoolsubject.routes"));
const subjectrequest_routes_1 = __importDefault(require("./routes/subjectrequest.routes"));
const scheduleClass_routes_1 = __importDefault(require("./routes/scheduleClass.routes"));
const schoolClass_routes_1 = __importDefault(require("./routes/schoolClass.routes"));
const grade_routes_1 = __importDefault(require("./routes/grade.routes"));
const app = (0, express_1.default)();
// Increase payload size limit (e.g., 10MB)
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://127.0.0.1:27017/skola");
mongoose_1.default.connection.once('open', () => {
    console.log("db connection ok");
});
const router = express_1.default.Router();
router.use('/user', user_routes_1.default);
router.use('/requests', regrequest_routes_1.default);
router.use('/engagements', engagement_routes_1.default);
router.use('/schoolsubjects', schoolsubject_routes_1.default);
router.use('/subjectrequests', subjectrequest_routes_1.default);
router.use('/classrequests', scheduleClass_routes_1.default);
router.use('/classes', schoolClass_routes_1.default);
router.use('/grades', grade_routes_1.default);
app.use('/', router);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
