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
//import request from 'request-promise';
const request_1 = __importDefault(require("request"));
const axios_1 = __importDefault(require("axios"));
const externalAPIRouter = express_1.default.Router();
exports.externalAPIRouter = externalAPIRouter;
// Interactive Broker API (RESPful)
const IBAPI_baseurl = 'https://localhost:8080/v1/api';
// Test Script
externalAPIRouter.get('/TEST', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield axios_1.default.get('https://localhost:8000/test')
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        console.log(error);
    });
    res.send(data);
    console.log(data);
    next();
}));
externalAPIRouter.get('/Test_2', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield axios_1.default.get('https://ghibliapi.herokuapp.com/films')
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        console.log(error);
    });
    res.send(data);
    next();
}));
// IB Session Logic
externalAPIRouter.get('/IB/Session/Validate_2', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    console.log(api_url);
    const data = yield axios_1.default.get(api_url)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        console.log(error);
    });
    res.send(data);
    next();
}));
externalAPIRouter.get('/IB/Session/Validate', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/sso/validate`;
    console.log(api_url);
    (0, request_1.default)({
        uri: api_url,
        method: 'GET'
    }).pipe(res);
    next();
});
externalAPIRouter.get('/IB/Session/AuthenticateStatus', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/iserver/auth/status`;
    (0, request_1.default)(api_url, {
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
    };
    (0, request_1.default)(api_url, { method: 'POST' }).pipe(res);
    next();
});
externalAPIRouter.get('/IB/Logout', (req, res, next) => {
    const api_url = `${IBAPI_baseurl}/logout`;
    (0, request_1.default)(api_url, { method: 'POST' }).pipe(res);
    next();
});
