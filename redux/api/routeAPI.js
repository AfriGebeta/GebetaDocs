import {API, handleApiError} from "./util";


export const getRoute = async (url) => {
    try{
        const { data } = await API.get(url)
        return { error: null, data };
    }catch (error) {
        return handleApiError(error);
    }
}

export const getRoutes = async (url, body) => {
    try {
        const {data} = await API.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return {error: null, data};
    } catch (error) {
        return handleApiError(error)
    }
}
