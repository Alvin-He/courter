

const swc = navigator.serviceWorker.controller;
if (!swc) { 
    console.warn('Service worker not found'); 
    window.location.reload();
}

let sw_callbacks = { index: 0 };
navigator.serviceWorker.addEventListener('message', function (event) {
    const id = event.data.id;
    const callback = sw_callbacks[id];
    if (!id || typeof callback != 'function') throw new Error('Invalid message id or callback');
    callback(event.data.payload);
    delete sw_callbacks[id];
});
const api = function (data) {
    return new Promise(function (resolve, reject) {
        const id = Math.random();
        sw_callbacks[id] = resolve;
        swc.postMessage({ id: id, ...data });
    });
}

export default api;