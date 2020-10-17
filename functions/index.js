const functions = require('firebase-functions');
require('dotenv').config();
const express = require('express');
const {PORT, DATABASE_URL,DOMAINS } = require('./config');
const {router: mainRouter} = require('./routers/main-router.js');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
app.use(jsonParser);
app.use(function (req, res, next) {
    let origin = req.headers.origin;
    let allowedOrigins = DOMAINS.split(',');
    //if(allowedOrigins.indexOf(origin) > -1){
       //res.setHeader('Access-Control-Allow-Origin', origin);
    //}
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
app.use('/api',mainRouter);
//generic error handler
app.use((req,res,next) => {
    res.status = 500;
    return res.json({
        message:'An error occured',
        error:res.err
    })
});
/*
async function runServer(port = PORT){
    try{
        let server = app.listen(port,() => {
            console.log('app listeneing on port ' + port);
        });

        return true;
    }
    catch(err){
        return false;
    }
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
            return reject(err);
            }
            resolve();
        });
    });
}

runServer(DATABASE_URL).catch(err => console.error(err));
*/
//module.exports = { app: functions.https.onRequest(app), runServer, closeServer };

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
