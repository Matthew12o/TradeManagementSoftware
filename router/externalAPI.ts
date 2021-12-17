import express, { response } from 'express';
import request from 'request';
import axios from 'axios';
import https from 'https';

const externalAPIRouter = express.Router();


// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://127.0.0.1:8080/v1/api' 

const agent = new https.Agent({
    rejectUnauthorized: false
});

// Middleware Script
const getRequest = (url: string) => {
    const returnPromise = new Promise((resolve, reject) => {
        axios.get(url, {
            httpsAgent: agent
        })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
    return returnPromise
}
    new Promise((resolve, reject) => {

}) 


// Test Script
externalAPIRouter.get('/TEST', async (req, res, next) => {
    let url = 'https://127.0.0.1:8080/v1/api/sso/validate'
    const data = await getRequest(url);
    res.send(data.data);
    next();
});

// Test Script - End

//////////////
//  Session //
//////////////

// IB Session Validate
externalAPIRouter.get('/IB/Session/Validate', async (req, res, next) =>{
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    await axios.get(api_url, {
        httpsAgent: agent
    })
        .then((response) => {
            res.send(response.data)
        })
        .catch((err) => {
            console.error(err);
        });
    next();
})

// IB Session Authenticate Status
externalAPIRouter.get('/IB/Session/AuthenticateStatus', async (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/iserver/auth/status`;
    await axios.post(api_url, {
        httpsAgent: agent
    })
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    next();
});

// IB Session Ping (Tickle)
externalAPIRouter.all('/IB/Session/Ping', async (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/tickle`;
    await axios.post(api_url, {
        httpsAgent: agent
    })
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    next();
});

// IB Session Logout
externalAPIRouter.get('/IB/Session/Logout', async (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/logout`;
    await axios.post(api_url, {
        httpsAgent: agent
    })
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.error(err);
        });
    next();
});


//////////////
//  Account 
//////////////



///////////////
//  Contract 
///////////////


///////////////
//  Market Data 
///////////////


///////////////
//  Scanner 
///////////////


///////////////
//  PortfolioAnalyst 
///////////////


///////////////
//  Portfolio 
///////////////


///////////////
//  FYI 
///////////////


///////////////
//  Trades 
///////////////


///////////////
//  Alert 
///////////////


///////////////
//  Order 
///////////////


///////////////
//  PnL 
///////////////


///////////////
//  Streaming 
///////////////


///////////////
//  CCP (Beta) 
///////////////


///////////////
//  MarketData (Beta) 
///////////////


// Bloomberg API

// Export Module

export {externalAPIRouter}