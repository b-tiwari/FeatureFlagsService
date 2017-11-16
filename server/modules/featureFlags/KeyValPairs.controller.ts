import { Request, Response } from 'express';
import { FeatureFlag, KeyVal } from '../../entities';
import { FeatureFlagModel, IFeatureFlagModel } from './featureFlags.model';
import { remove } from 'lodash';

export async function addKeyValPair(request: Request, response: Response) {
  try {
    const featureFlagId = request.params.id;
    const key = request.body.keyVal.key;
    const value = request.body.keyVal.value;

    let featureFlag = await FeatureFlagModel.findById({ _id: featureFlagId });

    if (featureFlag) {
      if (featureFlag.KeyVals.filter(kv => kv.key === key).length > 0) {
        const [kv] = featureFlag.KeyVals.filter(kv => kv.key === key);
        kv.value = value;
      } else {
        featureFlag.KeyVals.push(request.body.keyVal);
      }

      console.log('updated feature flag=', featureFlag);
      featureFlag = await FeatureFlagModel.findByIdAndUpdate({ _id: featureFlagId }, featureFlag, { new: true });
      return response.status(200).json(featureFlag);

    } else {
      return response.status(400).send({ error: { message: 'invalid featureFlag id' } });
    }
  } catch (err) {
    return response.status(500).json(err);
  }
}

export async function updateKeyValPair(request: Request, response: Response) {
  try {
    const featureFlagId = request.params.id;
    const key = request.body.keyVal.key;
    const value = request.body.keyVal.value;

    let featureFlag = await FeatureFlagModel.findById({ _id: featureFlagId });

    if (featureFlag) {
      if (featureFlag.KeyVals.filter(kv => kv.key === key).length > 0) {
        const [kv] = featureFlag.KeyVals.filter(kv => kv.key === key);
        kv.value = value;
      } else {
        return response.status(400).send({ error: { message: 'Key does not exist' } });
      }

      console.log('updated feature flag=', featureFlag);
      featureFlag = await FeatureFlagModel.findByIdAndUpdate({ _id: featureFlagId }, featureFlag, { new: true });
      return response.status(200).json(featureFlag);

    } else {
      return response.status(400).send({ error: { message: 'invalid featureFlag id' } });
    }
  } catch (err) {
    return response.status(500).json(err);
  }
}

export async function deleteKeyValPair(request: Request, response: Response) {
  try {
    const featureFlagId = request.params.id;
    const key = request.params.key;

    let featureFlag = await FeatureFlagModel.findById({ _id: featureFlagId });

    if (featureFlag) {
      remove(featureFlag.KeyVals, (kv) => kv.key === key);
    }

    console.log('updated feature flag=', featureFlag);
    featureFlag = await FeatureFlagModel.findByIdAndUpdate({ _id: featureFlagId }, featureFlag, { new: true });
    return response.status(200).json(featureFlag);

  } catch (err) {
    return response.status(500).json(err);
  }
}
