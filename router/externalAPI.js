"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalAPIRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const externalAPIRouter = express_1.default.Router();
exports.externalAPIRouter = externalAPIRouter;
// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://127.0.0.1:8080/v1/api';
const agent = new https_1.default.Agent({
    rejectUnauthorized: false
});
//////////////////
// Axios Requests
//////////////////
// GET
const getRequest = (url) => {
    const returnPromise = new Promise((resolve, reject) => {
        axios_1.default.get(url, {
            httpsAgent: agent
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
    return returnPromise;
};
// POST
const postRequest = (url) => {
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.post(url, {
            httpsAgent: agent
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            rejects(error);
        });
    });
    return returnPromise;
};
// DELETE
const deleteRequest = (url) => {
    const returnPromise = new Promise((resolve, rejects) => {
        axios_1.default.delete(url, {
            httpsAgent: agent
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            rejects(error);
        });
    });
    return returnPromise;
};
// Test Script
externalAPIRouter.get('/TEST', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let url = 'https://127.0.0.1:8080/v1/api/sso/validate';
    const data = yield getRequest(url);
    res.send(data.data);
    next();
}));
// Test Script - End
//////////////
//  Session //
//////////////
// IB Session Validate
externalAPIRouter.get('/IB/Session/Validate', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    const data = yield getRequest(api_url);
    res.send(data.data);
    next();
}));
// IB Session Authenticate Status
externalAPIRouter.get('/IB/Session/AuthenticateStatus', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api_url = `${IBAPI_baseurl}/iserver/auth/status`;
    const data = yield postRequest(api_url);
    res.send(data.data);
    next();
}));
// IB Session Ping (Tickle)
externalAPIRouter.all('/IB/Session/Ping', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api_url = `${IBAPI_baseurl}/tickle`;
    yield axios_1.default.post(api_url, {
        httpsAgent: agent
    })
        .then((response) => {
        res.send(response.data);
    })
        .catch((err) => {
        console.error(err);
    });
    next();
}));
// IB Session Logout
externalAPIRouter.get('/IB/Session/Logout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api_url = `${IBAPI_baseurl}/logout`;
    yield axios_1.default.post(api_url, {
        httpsAgent: agent
    })
        .then((response) => {
        res.send(response.data);
    })
        .catch((err) => {
        console.error(err);
    });
    next();
}));
