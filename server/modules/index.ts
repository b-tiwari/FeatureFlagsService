import * as express from 'express';

import AppConfig from '../config/app-config';
import FeatureFlagsRoutes from './featureFlags/featureFlags.routes';

const routes = (route) => {
    return `/api/${AppConfig.API_Version}/${route}`;
}

const AppRoutes = (app: express.Express) => {
    app.use(routes('featureflags'), FeatureFlagsRoutes);
}

export default AppRoutes;
