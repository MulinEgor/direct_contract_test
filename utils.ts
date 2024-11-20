import config from "./config";
import * as fs from "fs";
import * as csv from "csv-stringify";
import { Client } from "./clients";

export async function writeClientsToCSV(
  clients: Client[],
  outputPath: string
): Promise<void> {
  const csvStringifier = csv.stringify({
    header: true,
    columns: [
      "id",
      "firstName",
      "lastName",
      "gender",
      "address",
      "city",
      "phone",
      "email",
      "status",
    ],
  });

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(outputPath);

    writeStream.on("finish", resolve);
    writeStream.on("error", reject);

    csvStringifier.pipe(writeStream);
    clients.forEach((client) => csvStringifier.write(client));
    csvStringifier.end();
  });
}
