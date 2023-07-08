const supertest = require("supertest");
const app = require("./http_server");
const { faker } = require("@faker-js/faker");
const request = supertest(app);
// it("Hello World!", async (done) => {
//   expect(1).toBe(1);
//   done();
// });

// returns a random user using faker
function user() {
  // setup
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const date = faker.date.past(
    50,
    new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST")
  );

  // random data
  const name = faker.name.fullName(firstName, lastName);
  const email = faker.internet.email(firstName, lastName);
  const username = faker.internet.userName(firstName, lastName);
  const password = faker.internet.password();
  const phone = faker.phone.number();
  const streetaddress = faker.address.streetAddress();
  const citystatezip =
    faker.address.city() +
    ", " +
    faker.address.stateAbbr() +
    " " +
    faker.address.zipCode();
  const latitude = faker.address.latitude();
  const longitude = faker.address.longitude();
  const avatar = faker.internet.avatar();
  const dob =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  // return new user object
  return {
    name,
    dob,
    email,
    username,
    password,
    phone,
    streetaddress,
    citystatezip,
    latitude,
    longitude,
    avatar,
  };
}

// create test users
const user1 = user();
const user2 = user();
const user3 = user();

it("populate data", async (done) => {
  await request.post("/add").send(user1);
  await request.post("/add").send(user2);
  await request.post("/add").send(user3);
  done();
});

it("verify data", async (done) => {
  const data = await request.get("/data");
  expect(data.body.some((e) => e.name === user1.name)).toBeTruthy();
  expect(data.body.some((e) => e.name === user2.name)).toBeTruthy();
  expect(data.body.some((e) => e.name === user3.name)).toBeTruthy();
  done();
});

var server = app.listen(8080, function () {
  console.log("Running on port 8080");
});

afterAll((done) => {
  server.close();
  done();
});
