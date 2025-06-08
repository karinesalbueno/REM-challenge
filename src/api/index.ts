import axios from "axios";

const baseURL = "https://app.wewantwaste.co.uk/api/skips";

const API = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    transformRequest: [(data) => JSON.stringify(data)]
})

export const getByLocation = async (postcode: string, area: string) => {
    const response = await API.get("/by-location", {
        params: { postcode, area },
    });

    return response.data;
};
