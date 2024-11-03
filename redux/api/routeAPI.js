import {API, handleApiError} from "./util";


export const getRoute = async (url) => {
    try{
        const { data } = await API.get(url)
        return { error: null, data };
    }catch (error) {
        return handleApiError(error);
    }
}
