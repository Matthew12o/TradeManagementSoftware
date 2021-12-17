"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Routers
const externalAPI_1 = require("./router/externalAPI");
const app = (0, express_1.default)();
const PORT = 8000;
// app.use(((req, res, next) => { res.header('Access-Control-Allow-Origin', 'https://localhost:8000'); }));
app.use('/API', externalAPI_1.externalAPIRouter);
app.get('/test', (req, res, next) => {
    res.send('hello');
    next();
});
app.listen(PORT);
