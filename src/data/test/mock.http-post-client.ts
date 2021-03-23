import faker from "faker";

export const httpPostParams = () => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});
