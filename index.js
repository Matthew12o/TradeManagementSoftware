"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// API
const IB_1 = require("./API/External/IB");
// Routers
const externalAPI_1 = require("./router/externalAPI");
const app = (0, express_1.default)();
const PORT = 8000;
app.use('/API', externalAPI_1.externalAPIRouter);
app.get('/', (req, res, next) => {
    res.send('home');
    next();
});
app.get('/test', (req, res, next) => {
    const api = new IB_1.IB_API(8080);
    const data = api.Account.Accounts_List();
    data.then((response) => {
        res.send(response.data);
    })
        .catch((err) => {
        console.error(err);
    })
        .then(() => {
        next();
    });
});
app.listen(PORT, () => {
    console.log(`Application is running: https://localhost:${PORT}`);
});
