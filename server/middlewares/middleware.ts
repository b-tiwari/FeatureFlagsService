import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

const AppMiddleware = (app: express.Express) => {

    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    commonMiddleware(app);
    switch (process.env.NODE_ENV) {
        case 'development':
        case 'dev':
            devMiddleware(app);
            break;
        case 'prod':
        case 'production':
            prodMiddleware(app);
            break;
    }
}

const commonMiddleware = (app: express.Express) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

const devMiddleware = (app: express.Express) => {
    app.use(morgan('dev'));
}

const prodMiddleware = (app: express.Express) => {
    app.use(compression());
    app.use(helmet());
}

export default AppMiddleware;
