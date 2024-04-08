import { AuthController } from "../controllers/auth";
import { AdminModel } from "../models/admin";
import { DoctorModel } from "../models/doctor";
import { PatientModel } from "../models/patient";
import { faker } from "@faker-js/faker";
import { getMongoDB } from "./connection";
import { testTypes } from "../data/testTypes";

generateData();

async function generateData() {
  createTestTypes();
  for (let index = 0; index < 2; index++) {
    await createAdmin();
    const { id } = await createDoctor();
    for (let index = 0; index < 2; index++) {
      await createPatient(id.toString());
    }
  }
}

async function createTestTypes() {
  const db = await getMongoDB();
  const collectionExists = await db
    .listCollections({ name: "testTypes" })
    .hasNext();
  if (!collectionExists) {
    const collection = db.collection("testTypes");
    await collection.insertMany(testTypes);
  }
}

async function createAdmin() {
  const admin = {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    password: "admin",
    age: faker.number.int({ min: 18, max: 100 }),
    city: faker.location.city(),
    email: faker.internet.email(),
    phone: faker.number.int({ min: 100000000, max: 999999999 }),
  };

  admin.password = await AuthController.hashPassword(admin.password);

  await AdminModel.create({ input: admin });
}

async function createDoctor() {
  const doctor = {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    password: "doctor",
    age: faker.number.int({ min: 18, max: 100 }),
    city: faker.location.city(),
    email: faker.internet.email(),
    phone: faker.number.int({ min: 100000000, max: 999999999 }),
  };

  doctor.password = await AuthController.hashPassword(doctor.password);

  const newDoctor = await DoctorModel.create({ input: doctor });
  return newDoctor;
}

async function createPatient(doctorId: string) {
  const patient = {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    doctorId,
    age: faker.number.int({ min: 18, max: 100 }),
    city: faker.location.city(),
    email: faker.internet.email(),
    phone: faker.number.int({ min: 100000000, max: 999999999 }),
    weight: faker.number.float({ min: 50, max: 150 }),
    height: faker.number.float({ min: 150, max: 250 }),
    activityLevel: faker.number.int({ min: 1, max: 5 }),
    isFibro: false,
    diagnosisYears: faker.number.int({ min: 0, max: 50 }),
    occupation: faker.person.jobTitle(),
  };

  await PatientModel.create({ input: patient });
}
