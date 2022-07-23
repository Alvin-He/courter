/* eslint-disable no-restricted-globals */

let token = 'abcdefghijklmnopqrstuvwxyz'; //localStorage.getItem('token');
let lastTokenUpdate = 0;
const tokenTimeoutInterval = 1000*60*5;

class Client {
    constructor(client, id) {
        this.client = client;
        this.id = id;
    }
    respond(data) {
        this.client.postMessage({id: this.id, payload: data});
    }
}

self.addEventListener('install', (event) => {
    console.log('Service worker installed.');
    self.skipWaiting();
});


self.addEventListener('message', async (event) => {
    const data = event.data;
    const type = data.type;
    const id = data.id;
    const client = new Client(event.source, id);
    switch (type) {
        case 'ping': {
            client.postMessage({id: id, type: 'pong'});
            break;
        } case 'auth': {
            console.log('auth message received');
            console.log('Username: ' + data.username + ' Password: ' + data.password);
            client.respond({type: 'auth', success: false});
            break;
        } case 'get': {
            console.log('get message received');
            console.log('headers: ' + data.headers);
            // const response = await fetch('/api/get/' + data.resourceName, data.headers);
            const payload = 'PAYLOAD' //await response.json();
            client.respond(payload);
            break;
        } case 'some-action': {
            // verify data validility and refresh token if needed
            if (!data.someValue) return;  
            if (hasTokenExceedTimeout()) await refreshToken();

            const response = await fetch('/api/...'); //send the request to the server
            const payload = await response.json(); // get the response payload (if there's a payload)
            client.respond(payload); // send the response to the client
            // or do smth
            break;
        } default: {
            console.log('Unknown message type:', type);
            break;
        }
    }
});

function hasTokenExceedTimeout() {
    // Time out check
    const currentTime = new Date().getTime();
    if (currentTime - lastTokenUpdate > tokenTimeoutInterval) return true; // the token had timed out
}

async function refreshToken() {
    console.log('Refreshing token...');
    // const response = await fetch('/api/token', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Basic ' + btoa('admin:admin')
    //     }
    // });
    const data = {token: 'abcdefghijkl'}//await response.json();
    token = data.token;
    // localStorage.setItem('token', token);
    lastTokenUpdate = new Date().getTime();
    if (hasTokenExceedTimeout()) await refreshToken();
} 
