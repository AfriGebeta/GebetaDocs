import axios from "axios";

export const BASE_URL = "https://mapapi.gebeta.app";
export const LOCAL_BASE_URL = "http://localhost:8081/api";
export const TEST_URL = "https://apitest.gebeta.app";
// http://68.219.183.24:8080

export const API = axios.create({
    baseURL: BASE_URL,
});

export const handleApiError = async (error) => {
    try {
        const errorData = error?.response?.data?.error;
        const errorMessage = typeof errorData === 'object' && errorData !== null
            ? errorData.message
            : errorData || "An unexpected error occurred.";

        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};
