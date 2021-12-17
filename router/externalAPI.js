"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAPIRouter = void 0;
const express_1 = __importDefault(require("express"));
const request_promise_1 = __importDefault(require("request-promise"));
const request_1 = __importDefault(require("request"));
const externalAPIRouter = express_1.default.Router();
exports.externalAPIRouter = externalAPIRouter;
// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://localhost:8080/v1/api';
// Test Script
externalAPIRouter.get('/TEST', (req, res, next) => {
    (0, request_1.default)({
        uri: 'https://ghibliapi.herokuapp.com/films',
    }).pipe(res);
});
// IB Session Logic
externalAPIRouter.get('/IB/Session/Validate', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    var options = {
        method: 'GET',
        url: api_url,
        json: true,
    };
    (0, request_promise_1.default)(options)
        .then((parsedBody) => {
        // Do something
    })
        .catch((err) => {
    });
    next();
});
externalAPIRouter.get('/IB/Session/AuthenticateStatus', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/iserver/auth/status`;
    var options = {
        method: 'POST',
        url: api_url,
        json: true,
    };
    (0, request_promise_1.default)(options)
        .then((parseBody) => {
        // Do something
    })
        .catch((err) => {
    });
    next();
});
externalAPIRouter.all('/IB/Ping', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/tickle`;
    var options = {
        method: 'POST',
        uri: api_url,
        json: true,
    };
    (0, request_promise_1.default)(options)
        .then((parseBody) => {
        // Do something 
        console.log(parseBody);
    })
        .catch((err) => {
    });
    next();
});
externalAPIRouter.get('/IB/Logout', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/logout`;
    var options = {
        method: 'POST',
        url: api_url,
        json: true
    };
    (0, request_promise_1.default)(options)
        .then((parseBody) => {
        // Do something
    })
        .catch((err) => {
    });
    next();
});
