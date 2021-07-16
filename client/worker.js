console.log('service worker first loading');

self.addEventListener('push', e=>{

    const data= e.data;
    self.registration.showNotification(data.title,{
        body:'notified by hossam',
        icon:'http://image.ibb.com/frYOFd/tmlogo.png'
    })
});