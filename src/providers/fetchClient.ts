import axios from "axios";
import Config from "react-native-config";

const provider = axios.create({
  baseURL: `https://api.musixmatch.com/ws/1.1/`,
});

console.log('Config.API_KEY_CREDENTIALS', Config.API_URL_MUSIXMATCH);
console.log('Config.API_KEY_CREDENTIALS', Config.API_KEY_CREDENTIALS);

provider.interceptors.request.use(async ({ headers, params, ...config }) => {
  return {
    ...config,
    params: {
      apikey: `8f338e9b8bdd841b7dd79a4dd62c2b99`,
    },
  };
});

provider.interceptors.response.use(
  (response) => {
    // console.log('XXXXXXXXXXXX-xxxxxx', JSON.stringify(response));
    return response?.data;
  },
  (err) => Promise.reject(err?.response?.data)
);

export default provider;
