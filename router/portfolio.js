"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioRouter = void 0;
const express_1 = __importDefault(require("express"));
const portfolioRouter = express_1.default.Router();
exports.portfolioRouter = portfolioRouter;
// Middleware Functions
// Root Portfolio Page
portfolioRouter.route('/')
    .get((req, res, next) => {
    // Display Holistic Portfolio Information
    //
    next();
});
// Principal Portfolio
portfolioRouter.route('/Principal')
    .get((req, res, next) => {
    // Display Principal Portfolio
    //
    next();
});
portfolioRouter.route('/Principal/:underlying_id')
    .get((req, res, next) => {
    //Display informationa about the underlying (i.e. position/history)
    //Same data as underwriting, but display will be different
});
// Underwriting Porfolio
portfolioRouter.route('/Underwriting')
    .get((req, res, next) => {
    // Display Underwriting Portfolio
    //
    next();
});
// Underwritn Portfolio : Static links
// Underwriting Portfolio : Dynamic
portfolioRouter.route('/Underwriting/:underlying_id')
    .get((req, res, next) => {
    // Display informationa about the underlying (i.e. position/history)
    //Same data as principal, but display will be different
    //
    next();
});
