import express from 'express';
import { ApplicationLogger, Log } from '../misc/logger';

const portfolioRouter = express.Router();

// Middleware Functions

// Root Portfolio Page
portfolioRouter.route('/')
    .get((req, res, next) => {
        // Display Holistic Portfolio Information

        //
        next()
    });

// Principal Portfolio
portfolioRouter.route('/Principal')
    .get((req, res, next) => {
        // Display Principal Portfolio

        //
        next()
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


export { portfolioRouter };