import { login } from "./auth";
import { getClients } from "./clients";
import { writeClientsToCSV } from "./utils";

async function main() {
  await login();
  console.log("Авторизация прошла успешно");
  const clients = await getClients();
  console.log("Получение списка клиентов прошло успешно");
  await writeClientsToCSV(clients, "result.csv");
  console.log("Запись в CSV файл прошла успешно");
}

main();
