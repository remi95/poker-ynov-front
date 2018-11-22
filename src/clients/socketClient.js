import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
import {API_URL} from "../config";
import Cookies from "js-cookie";

class SocketClient {

    constructor() {
        this.io = sailsIOClient(socketIOClient);

        this.io.sails.url = API_URL;
        this.io.sails.headers = {
            "Authorization": `Bearer ${Cookies.get('user-token')}`
        };
    }

    joinGame = (userId) => {
        this.io.socket.post(
            '/user/join', { userId }
        );
    };

}

const socketClient = new SocketClient();

export default socketClient;