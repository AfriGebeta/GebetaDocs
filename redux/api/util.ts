import axios from "axios";

export const BASE_URL = "https://mapapi.gebeta.app";
export const LOCAL_BASE_URL = "http://localhost:8081/api";
export const TEST_URL = "https://apitest.gebeta.app";
// http://68.219.183.24:8080

export const API = axios.create({
    baseURL: TEST_URL,
});

export const handleApiError = async (error) => {
    try {
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.msg ||
            "An unexpected error occurred.";
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error("An unexpected error occurred.");
    }
};
