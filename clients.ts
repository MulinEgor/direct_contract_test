import config from "./config";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  status: string;
}

export async function getClients(): Promise<Client[]> {
  let offset = 0;
  const clients: Client[] = [];

  while (true) {
    const response = await config.axios.get("/clients", {
      params: {
        limit: 1000,
        offset,
      },
    });

    if (response.data.length === 0) {
      break;
    }

    const ids = response.data.map((client) => client.id);
    const statuses = await getClientsStatuses(ids);

    clients.push(
      ...response.data.map((client) => ({
        ...client,
        status: statuses[client.id - offset],
      }))
    );
    offset += 1000;
  }

  return clients;
}

async function getClientsStatuses(ids: number[]) {
  const response = await config.axios.post("/clients", {
    userIds: ids,
  });

  return response.data.map((data) => data.status);
}
