import { WEBSOCKET_URL } from "../config/config.js";
import {guestId} from "../guest-manager.js";


export let socket = new WebSocket(WEBSOCKET_URL);
//console.log(socket)

socket.addEventListener('open', ()=> {
    console.log('Successfully connected to Playdyn backend with WEBSOCKET_URL', WEBSOCKET_URL);
    socket.send(JSON.stringify({type: 'storeUser', userId: guestId}));
});

export function sendMessage(message) {
    if (socket.readyState !== WebSocket.OPEN) {
       // alert('Not connected, reconnecting...');
        socket = new WebSocket(WEBSOCKET_URL)
        return;
    }

    socket.send(JSON.stringify(message));
   // console.log('sent', message)
    return true;
}

export function onMessage(callback) {
    socket.addEventListener('message', (event) => {
        callback(JSON.parse(event.data));
    });
}
//onMessage();