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
        for (let i = 0; i < 1; i++) {
            yield createAdmin(i);
            const { id } = yield createDoctor(i);
            for (let j = 0; j < 4; j++) {
                yield createPatient(id.toString(), i + j);
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
function createAdmin(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = {
            name: faker_1.faker.person.firstName(),
            surname: faker_1.faker.person.lastName(),
            password: "admin",
            date: faker_1.faker.date.between({
                from: "1970-01-01T00:00:00.000Z",
                to: "2000-01-01T00:00:00.000Z",
            }),
            city: faker_1.faker.location.city(),
            email: index === 0 ? "admin@gmail.com" : faker_1.faker.internet.email(),
            phone: faker_1.faker.number.int({ min: 100000000, max: 999999999 }).toString(),
            photo: { id: null, name: null },
        };
        admin.password = yield auth_1.AuthController.hashPassword(admin.password);
        yield admin_1.AdminModel.create({ input: admin });
    });
}
function createDoctor(index) {
    return __awaiter(this, void 0, void 0, function* () {
        const doctor = {
            name: faker_1.faker.person.firstName(),
            surname: faker_1.faker.person.lastName(),
            password: "doctor",
            date: faker_1.faker.date.between({
                from: "1970-01-01T00:00:00.000Z",
                to: "2000-01-01T00:00:00.000Z",
            }),
            city: faker_1.faker.location.city(),
            email: index === 0 ? "doctor@gmail.com" : faker_1.faker.internet.email(),
            phone: faker_1.faker.number.int({ min: 100000000, max: 999999999 }).toString(),
            photo: { id: null, name: null },
        };
        doctor.password = yield auth_1.AuthController.hashPassword(doctor.password);
        const newDoctor = yield doctor_1.DoctorModel.create({ input: doctor });
        return newDoctor;
    });
}
function createPatient(doctorId, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const activityLevels = ["leve", "moderado", "activo"];
        const randomIndex = faker_1.faker.number.int({
            min: 0,
            max: activityLevels.length - 1,
        });
        const patient = {
            name: faker_1.faker.person.firstName(),
            surname: faker_1.faker.person.lastName(),
            password: "patient",
            doctorId,
            date: faker_1.faker.date.between({
                from: "1930-01-01T00:00:00.000Z",
                to: "2006-01-01T00:00:00.000Z",
            }),
            city: faker_1.faker.location.city(),
            email: getPatientEmail(index),
            phone: faker_1.faker.number.int({ min: 100000000, max: 999999999 }).toString(),
            weight: faker_1.faker.number.float({ fractionDigits: 2, min: 50, max: 130 }),
            height: faker_1.faker.number.float({ fractionDigits: 2, min: 150, max: 210 }),
            activityLevel: activityLevels[randomIndex],
            isFibro: false,
            diagnosisYears: faker_1.faker.number.int({ min: 0, max: 50 }),
            occupation: faker_1.faker.person.jobTitle(),
            photo: { id: null, name: null },
        };
        patient.password = yield auth_1.AuthController.hashPassword(patient.password);
        yield patient_1.PatientModel.create({ input: patient });
    });
}
function getPatientEmail(index) {
    return ({
        0: "patient@gmail.com",
        1: "sergio@gmail.com",
        2: "felix@gmail.com",
        3: "cristina@gmail.com",
    }[index] || faker_1.faker.internet.email());
}
