import config from "./config";

export async function login() {
  const username = getRandomUsername();
  const response = await config.axios.post("/auth/registration", {
    username,
  });

  config.axios.defaults.headers.common[
    "Authorization"
  ] = `${response.data.token}`;
}

function getRandomUsername() {
  let numbers = "";

  for (let i = 0; i < 10; i++) {
    numbers += Math.floor(Math.random() * 10);
  }

  return "egormulintest" + numbers;
}
