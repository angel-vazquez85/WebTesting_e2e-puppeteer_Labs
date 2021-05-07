import request from 'supertest';
import { given, then, when } from '../lib/bit.tester.js';

export default async function api() {
  await getHello();
  await postProject();
}
async function getHello() {
  const inputHostUrl = `https://api-base.herokuapp.com`;
  await given(`the API url ${inputHostUrl}`, async () => {
    const inputEndPoint = `/api/pub/hello`;
    await when(`we call the ${inputEndPoint} endPoint`, async () => {
      const response = await request(inputHostUrl).get(inputEndPoint);
      const actual = response.body.message;
      const expected = `Hola Mundo`;
      then(`respond with an Hola Mundo message`, actual, expected);
    });
  });
}

async function postProject() {
  const inputHostUrl = `https://api-base.herokuapp.com`;
  await given(`the API url ${inputHostUrl}`, async () => {
    const inputEndPoint = `/api/pub/projects`;
    await when(`we post to the ${inputEndPoint} endPoint`, async () => {
      const inputProject = { name: 'start testing', dueDate: '2020-12-31' };
      const response = await request(inputHostUrl).post(inputEndPoint).send(inputProject);
      const actual = response.body.name;
      const expected = 'start testing';
      then(`respond with the same object`, actual, expected);
      const expectedStatus = 201;
      then(`respond with status code 201`, response.status, expectedStatus);
    });
  });
}
