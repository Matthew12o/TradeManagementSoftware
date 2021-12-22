import express from 'express';


// API
import { IB_API } from './API/External/IB';

// Routers
import { externalAPIRouter } from './router/externalAPI';
import { portfolioRouter } from './router/portfolio';

const app = express();
const PORT = 8000;

app.use('/API', externalAPIRouter);
app.use('/Portfolio', portfolioRouter);

app.get('/', (req, res, next) => {
    res.send('home');
    next();
})

app.get('/test', (req, res, next) => {
    const api = new IB_API(8080);
    const data = api.Account.Accounts_List();
    data.then((response) => {
        res.send(response.data);
    })
    .catch((err) => {
        console.error(err);
    })
    .then(() => {
        next();
    })
});

app.listen(PORT, ()=> {
    console.log(`Application is running: https://localhost:${PORT}`);
});