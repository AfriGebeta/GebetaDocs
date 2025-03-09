import axios from "axios";
import * as process from "process";

export const LOCAL_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_TEST_URL;
export const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const API = axios.create({
    baseURL: PRODUCTION_URL,
});