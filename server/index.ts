import './config/database';

import * as express from 'express';

import AppConfig from './config/app-config';
import AppMiddleware from './middlewares/middleware';
import AppRoutes from './modules';

// create express app
const app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept');
    next();
});

// set middlewares
AppMiddleware(app);
AppRoutes(app);

// set routes
app.get('/', (req, res) => {
    res.send('Features Flag API');
});

// start app
app.listen(AppConfig.PORT, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`This is Express-Webserver reporting!!
            Running in ENV = ${process.env.NODE_ENV}
            I\'m ready and listening to requests  at port ${AppConfig.PORT}!!`);
    }
});
