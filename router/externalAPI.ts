import express from 'express';
//import request from 'request-promise';
import request from 'request';

const externalAPIRouter = express.Router();


// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://localhost:8080/v1/api' 

// Test Script
externalAPIRouter.get('/TEST', (req, res, next) => {
    request({
        uri: 'https://ghibliapi.herokuapp.com/films',
        method: 'GET'
    }).pipe(res);
});

// IB Session Logic
externalAPIRouter.get('/IB/Session/Validate', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    request(api_url, {
        method: 'GET'
    }).pipe(res);
    next();
});

externalAPIRouter.get('/IB/Session/AuthenticateStatus', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/iserver/auth/status`;
    request(api_url, {
        method: 'POST'
    }).pipe(res);
    next();
});

externalAPIRouter.all('/IB/Ping', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/tickle`;
    var options = {
        method: 'POST',
        uri: api_url,
        json: true,
    }
    request(api_url, {method: 'POST'}).pipe(res);
    next();
});

externalAPIRouter.get('/IB/Logout', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/logout`;
    request(api_url, {method: 'POST'}).pipe(res);
    next();
});
// Bloomberg API





// Export Module

export {externalAPIRouter}