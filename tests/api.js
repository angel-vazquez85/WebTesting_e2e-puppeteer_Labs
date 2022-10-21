import request from "supertest";
import { given, then, when } from "../lib/bit.tester.js";

export default async function api() {
  await getHello();
  await postProject();
  await deleteProject();
}

// ************************************************************************************************
// ⚡️ Start the the api server before running the tests
// npm run api
// ************************************************************************************************

async function getHello() {
  const inputHostUrl = `http://localhost:3000/`;
  await given(`the API url ${inputHostUrl}`, async () => {
    const inputEndPoint = `projects`;
    await when(`we call the ${inputEndPoint} endPoint`, async () => {
      const response = await request(inputHostUrl).get(inputEndPoint);
      const actual = Array.isArray(response.body);
      const expected = true;
      then(`respond with an array`, actual, expected);
    });
  });
}

async function postProject() {
  const inputHostUrl = `http://localhost:3000/`;
  await given(`the API url ${inputHostUrl}`, async () => {
    const inputEndPoint = `projects`;
    await when(`we post to the ${inputEndPoint} endPoint`, async () => {
      const inputProject = { id: "start_testing", name: "start testing", startDate: "2020-12-31" };
      const response = await request(inputHostUrl).post(inputEndPoint).send(inputProject);
      console.error(response.error);
      const actual = response.body.name;
      const expected = "start testing";
      then(`respond with the same object`, actual, expected);
      const expectedStatus = 201;
      then(`respond with status code 201`, response.status, expectedStatus);
    });
  });
}

async function deleteProject() {
  const inputHostUrl = `http://localhost:3000/`;
  await given(`the API url ${inputHostUrl}`, async () => {
    const inputEndPoint = `projects`;
    await when(`we send a delete to the ${inputEndPoint} endPoint`, async () => {
      const inputProject = { id: "start_testing", name: "start testing", startDate: "2020-12-31" };
      const response = await request(inputHostUrl).delete(inputEndPoint + "/" + inputProject.id);
      const expectedStatus = 200;
      then(`respond with status code 200`, response.status, expectedStatus);
    });
  });
}
