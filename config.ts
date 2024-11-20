import Axios from "axios";

const config = {
  axios: Axios.create({
    baseURL: "http://94.103.91.4:5000",
  }),
};

export default config;
