// Library
import axios from "axios";

const airtableInstance = axios.create(); // Instance with interceptor

airtableInstance.defaults.baseURL = "https://api.airtable.com/v0/";

airtableInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_AIRTABLE_TOKEN;
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export { airtableInstance };
