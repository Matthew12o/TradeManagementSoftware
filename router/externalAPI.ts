import express, { response } from 'express';
//import request from 'request-promise';
import request from 'request';
import axios from 'axios';

const externalAPIRouter = express.Router();


// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://localhost:8080/v1/api' 

// Test Script
externalAPIRouter.get('/TEST', async (req, res, next) => {
    const data = await axios.get('https://localhost:8000/test')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    res.send(data);
    console.log(data);
    next();
});

externalAPIRouter.get('/Test_2', async (req, res, next) => {
    const data = await axios.get('https://ghibliapi.herokuapp.com/films')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        })
    res.send(data);
    next();
})
// IB Session Logic
externalAPIRouter.get('/IB/Session/Validate_2', async (req, res, next) =>{
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    console.log(api_url)
    const data = await axios.get(api_url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    res.send(data);
    next();
})
externalAPIRouter.get('/IB/Session/Validate', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    console.log(api_url)
    request({
        uri: api_url,
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