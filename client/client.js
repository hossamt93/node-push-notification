const publicVapidKey = 'BLu3ZncLmoCxFVbXthSF1JMoFzr1FS6LKKBks7TnWOI6e816ch7edFtugb-dN5wfuQqIc5uYeiiURhGDW-plg5U';

if('serviceWorker' in navigator){
    send().catch(console.error)
}

async function send(){
    console.log('registering service worker');
    const register= await navigator.serviceWorker.register('./worker.js',{ 
        scope:'/'
    });

    console.log('registerd',register)
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    console.log( 'sub registerd',subscription);

    //seding subscription to backend
    await fetch('/subscribe',{
        method: 'post',
        body: JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    })

}

/**
 * 
 * @param {string} base64String 
 */
function urlBase64ToUint8Array(base64String){
    const padding = '='.repeat(( 4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g,'+').replace(/_/g,'/');
    const rawData = window.atob(base64);
    const outArray= new Uint8Array(rawData.length);

    for(let i = 0; i<rawData.length; ++i){
        outArray[i]=rawData.charCodeAt(i);
    }
    return outArray;
}