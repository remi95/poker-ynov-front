import {API_URL} from "../config";

class apiClient {

    async post(endpoint, data) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();

            if (!response.ok) {
                throw json;
            }

            return { status: true, data: json }
        }
        catch (error) {
            return { status: false, data: error }
        }
    }
}

const client = new apiClient();

export default client;