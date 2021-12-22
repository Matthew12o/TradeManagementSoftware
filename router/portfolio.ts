import express from 'express';
import { ApplicationLogger, Log } from '../misc/logger';
import { IB_API } from '../API/External/IB';

const portfolioRouter = express.Router();

// Middleware Functions
const api = new IB_API();

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

portfolioRouter.get('/account/:account_id', (req, res, next) => {
    const account_id = req.params.account_id;
    const data = api.Portfolio.Positions(account_id);
    data.then((response) => {
        console.log(response);
        res.send(response.data);
        next();
    }).catch((err) => {
        console.error(err);
        next();
    });
});

export { portfolioRouter };