import axios from "axios";

export const BASE_URL = "https://apitest.gebeta.app";
export const LOCAL_BASE_URL = "http://localhost:8081/api";
export const TEST_URL = "https://apitest.gebeta.app";
// http://68.219.183.24:8080

export const API = axios.create({
    baseURL: BASE_URL,
});