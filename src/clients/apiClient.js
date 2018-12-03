import { API_URL } from "../config";

class apiClient {
    constructor(url) {
        this.url = url;
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.url}${endpoint}`, {
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

    async get(endpoint, token=null) {
        try {
            if (token !== null) {
                const response = await fetch(`${this.url}/${endpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const json = await response.json();
                return json;
            }

            const response = await fetch(`${this.url}/${endpoint}`);

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

const client = new apiClient(API_URL);

export default client;