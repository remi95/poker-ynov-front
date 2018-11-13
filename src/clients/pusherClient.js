import { setPusherClient } from 'react-pusher';
import Pusher from 'pusher-js';
import {PUSHER_CLUSTER, PUSHER_KEY} from "../config";

const client = new Pusher(PUSHER_KEY, {
    cluster: PUSHER_CLUSTER,
    forceTLS: true
});

const pusherClient = setPusherClient(client);

export default pusherClient;