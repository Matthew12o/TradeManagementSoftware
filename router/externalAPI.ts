import express from 'express';
import request from 'request-promise';

const externalAPIRouter = express.Router();


// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://localhost:8080/v1/api' 

// IB Session Logic
externalAPIRouter.get('/IB/Session/Validate', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    var options = {
        method: 'GET',
        url: api_url,
        json: true,
    }
    request(options)
        .then((parsedBody) => {
            // Do something

        })
        .catch((err)=>{

        })
    
    next();

});

externalAPIRouter.get('/IB/Session/AuthenticateStatus', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/iserver/auth/status`;
    var options = {
        method: 'POST',
        url: api_url,
        json: true,
    }
    request(options)
        .then((parseBody) => {
            // Do something
        })
        .catch((err) => {

        })

    next();
});

externalAPIRouter.all('/IB/Ping', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/tickle`;
    var options = {
        method: 'POST',
        uri: api_url,
        json: true,
    }
    request(options)
        .then((parseBody) => {
            // Do something 
            console.log(parseBody);
        })
        .catch((err) => {

        })

    next();
});


externalAPIRouter.get('/IB/Logout', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/logout`;
    var options = {
        method: 'POST',
        url: api_url,
        json: true
    }
    request(options)
        .then((parseBody) => {
            // Do something
        })
        .catch((err) => {

        })

    next();
});
// Bloomberg API





// Export Module

export {externalAPIRouter}