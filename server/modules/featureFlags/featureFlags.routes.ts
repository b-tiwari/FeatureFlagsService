import { Router } from 'express';

import * as featursFlagsController from './featureFlags.controller';
import * as KeyValPairsController from './KeyValPairs.controller';

const FeatureFlagsRoutes = Router();

FeatureFlagsRoutes.get('/:app', featursFlagsController.getForApp);
FeatureFlagsRoutes.get('/:app/:account', featursFlagsController.getForAccount);
FeatureFlagsRoutes.post('', featursFlagsController.addFeatureFlag);
FeatureFlagsRoutes.put('/:id', featursFlagsController.updateFeatureFlag);
FeatureFlagsRoutes.delete('/:id', featursFlagsController.deleteFeatureFlag);

// conditions
FeatureFlagsRoutes.post('/:id/conditions', featursFlagsController.addCondition);
FeatureFlagsRoutes.put('/:id/conditions/:conditionKey', featursFlagsController.updateCondition);

// KeyVal pairs
FeatureFlagsRoutes.post('/:id/keyvals', KeyValPairsController.addKeyValPair);
FeatureFlagsRoutes.put('/:id/keyvals', KeyValPairsController.updateKeyValPair);
FeatureFlagsRoutes.delete('/:id/keyvals/:key', KeyValPairsController.deleteKeyValPair);

export default FeatureFlagsRoutes;
