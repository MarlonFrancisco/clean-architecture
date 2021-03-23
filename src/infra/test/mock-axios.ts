import axios from "axios";
import faker from "faker";

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.post.mockResolvedValue({
    status: faker.random.number(),
    body: faker.random.objectElement(),
  });

  return mockedAxios;
};
