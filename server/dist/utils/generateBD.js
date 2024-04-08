"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const admin_1 = require("../models/admin");
const doctor_1 = require("../models/doctor");
const patient_1 = require("../models/patient");
const faker_1 = require("@faker-js/faker");
const connection_1 = require("./connection");
const testTypes_1 = require("../data/testTypes");
generateData();
function generateData() {
    return __awaiter(this, void 0, void 0, function* () {
        createTestTypes();
        for (let index = 0; index < 2; index++) {
            yield createAdmin();
            const { id } = yield createDoctor();
            for (let index = 0; index < 2; index++) {
                yield createPatient(id.toString());
            }
        }
    });
}
function createTestTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.getMongoDB)();
        const collectionExists = yield db
            .listCollections({ name: "testTypes" })
            .hasNext();
        if (!collectionExists) {
            const collection = db.collection("testTypes");
            yield collection.insertMany(testTypes_1.testTypes);
        }
    });
}
function createAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = {
            name: faker_1.faker.person.firstName(),
            surname: faker_1.faker.person.lastName(),
            password: "admin",
            age: faker_1.faker.number.int({ min: 18, max: 100 }),
            city: faker_1.faker.location.city(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.number.int({ min: 100000000, max: 999999999 }),
        };
        admin.password = yield auth_1.AuthController.hashPassword(admin.password);
        yield admin_1.AdminModel.create({ input: admin });
    });
}
function createDoctor() {
    return __awaiter(this, void 0, void 0, function* () {
        const doctor = {
            name: faker_1.faker.person.firstName(),
            surname: faker_1.faker.person.lastName(),
            password: "doctor",
            age: faker_1.faker.number.int({ min: 18, max: 100 }),
            city: faker_1.faker.location.city(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.number.int({ min: 100000000, max: 999999999 }),
        };
        doctor.password = yield auth_1.AuthController.hashPassword(doctor.password);
        const newDoctor = yield doctor_1.DoctorModel.create({ input: doctor });
        return newDoctor;
    });
}
function createPatient(doctorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const patient = {
            name: faker_1.faker.person.firstName(),
            surname: faker_1.faker.person.lastName(),
            doctorId,
            age: faker_1.faker.number.int({ min: 18, max: 100 }),
            city: faker_1.faker.location.city(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.number.int({ min: 100000000, max: 999999999 }),
            weight: faker_1.faker.number.float({ min: 50, max: 150 }),
            height: faker_1.faker.number.float({ min: 150, max: 250 }),
            activityLevel: faker_1.faker.number.int({ min: 1, max: 5 }),
            isFibro: false,
            diagnosisYears: faker_1.faker.number.int({ min: 0, max: 50 }),
            occupation: faker_1.faker.person.jobTitle(),
        };
        yield patient_1.PatientModel.create({ input: patient });
    });
}
