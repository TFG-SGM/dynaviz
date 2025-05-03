"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const userAuth_1 = require("./middlewares/userAuth");
const patient_1 = require("./routes/patient");
const doctor_1 = require("./routes/doctor");
const admin_1 = require("./routes/admin");
const test_1 = require("./routes/test");
const testTypes_1 = require("./routes/testTypes");
const file_1 = require("./routes/file");
const modelPainted_1 = require("./routes/modelPainted");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
app.disable("x-powered-by");
app.use("/auth", auth_1.authRouter);
app.use(userAuth_1.userAuth);
app.use("/patient", patient_1.patientRouter);
app.use("/doctor", doctor_1.doctorRouter);
app.use("/admin", admin_1.adminRouter);
app.use("/test", test_1.testRouter);
app.use("/testType", testTypes_1.testTypeRouter);
app.use("/file", file_1.fileRouter);
app.use("/modelPainted", modelPainted_1.modelPaintedRouter);
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
