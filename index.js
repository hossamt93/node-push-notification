const express =require('express');
const webPush= require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'client')));
app.use(bodyParser.json());


const publicVapidKey = 'BLu3ZncLmoCxFVbXthSF1JMoFzr1FS6LKKBks7TnWOI6e816ch7edFtugb-dN5wfuQqIc5uYeiiURhGDW-plg5U';

const privateVapidKey = 'P96Yg1sctiWwSnUN6NUOTRZWS_fL0yeCxL8y1-XAIbs';

webPush.setVapidDetails('mailto:test123@gmail.com',publicVapidKey,privateVapidKey);


app.post('/subscribe',(req,res)=>{

    const sub = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({title: ' Push test'});

    webPush.sendNotification(sub, payload).catch(console.log);
});

const port = 4000;

app.listen( port, ()=> console.log('http://localhost:4000'))