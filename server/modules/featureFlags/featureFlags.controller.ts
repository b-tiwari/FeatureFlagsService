import { Request, Response } from 'express';

import { FeatureFlag, EnabledForConditionsConfig } from '../../entities';
import { EnabledForModel, FeatureFlagModel, IFeatureFlagModel } from './featureFlags.model';
import * as _ from 'lodash';

export async function getForApp(request: Request, response: Response) {
	try {
		const app = request.params.app.toLowerCase();
		const featureFlags: IFeatureFlagModel[] = await FeatureFlagModel.find({ app });
		if (featureFlags) {
			return response.status(200).json(featureFlags);
		}
		return response.status(204).json([]);
	} catch (err) {
		return response.status(500).json(err);
	}
}

export async function getForAccount(request: Request, response: Response) {
	try {
		console.log('params=', request.params);
		const formattedFeatureFlags = await getAppFeatureFlags(request);
		console.log('formattedFeatureFlags=', formattedFeatureFlags);
		return response.status(200).json(formattedFeatureFlags);
	} catch (err) {
		return response.status(500).json(err);
	}
}

export async function updateFeatureFlag(request: Request, response: Response) {
	try {
		const featureFlagId = request.params.id;
		const feature: FeatureFlag = <FeatureFlag>request.body;
		console.log('updating feature flag', feature.app, feature.key);
		const updatedFeatureFlag = await FeatureFlagModel.findOneAndUpdate({ _id: featureFlagId }, feature, { new: true });
		if (updatedFeatureFlag) {
			return response.status(200).json(updatedFeatureFlag);
		} else {
			return response.status(404).json({ error: 'Feature flag not found' });
		}

	} catch (error) {
		console.log('error adding feature flag : ', error);
		return response.status(500).json(error);
	}
}

export async function addFeatureFlag(request: Request, response: Response) {
	try {
		// see if feature flag already exists for the application
		const feature: FeatureFlag = <FeatureFlag>request.body;
		console.log('post payload', feature);
		feature.app = feature.app.toLowerCase();

		const featureFlag = new FeatureFlagModel(feature);
		const validateFeatureFlagError = featureFlag.validateSync();
		console.log('sent feature is valid=', validateFeatureFlagError);

		if (!validateFeatureFlagError) {
			let existingFeatureFlag: IFeatureFlagModel;
			console.log('querying by app and key');
			existingFeatureFlag = await FeatureFlagModel.findOne(
				{ app: featureFlag.app, key: featureFlag.key });
			console.log(' found by app+key=', existingFeatureFlag);

			if (existingFeatureFlag) {
				console.log('found existingFeatureFlag document matching with  app and key');
				return response.status(400).json({ error: 'feature flag exists for the given app and feature key' });
			}
			console.log('creating a new feature flag for', featureFlag.app, featureFlag.key);
			let newFeatureFlag: IFeatureFlagModel;
			newFeatureFlag = await FeatureFlagModel.create(featureFlag);
			return response.status(201).json(newFeatureFlag);

		} else {
			console.log('===validation error');
			return response.status(400).json(validateFeatureFlagError);
		}


	} catch (err) {
		console.log('error adding feature flag : ', err);
		return response.status(500).json({ error: 'Unknown error, please check payload or is duplicate app+key combo ' });
	}
}


export async function updateCondition(request: Request, response: Response) {
	try {

		const featureFlagId = request.params.id;
		const conditionKey = request.params.conditionKey;
		let featureFlag = await FeatureFlagModel.findById({ _id: featureFlagId });

		if (featureFlag) {
			const newVal = request.body.newValue;
			if (Array.isArray(featureFlag.enabledFor[conditionKey])) {
				if (!request.body.remove) { // if newValue is to be added, not to be removed
					if (featureFlag.enabledFor[conditionKey].indexOf(newVal) < 0) { // make sure newVal doesn't exist already
						featureFlag.enabledFor[conditionKey].push(newVal);
					} else {
						return response.status(400).send({ error: { message: 'duplicate value' } });
					}
				} else { // value is to be removed
					featureFlag.enabledFor[conditionKey].pop(newVal);
				}
			} else { // if the condition value is not array but a string/number
				console.log('updating conditions value', request.body);
				if (!request.body.remove) {
					featureFlag.enabledFor[conditionKey] = newVal;
				} else {
					featureFlag.enabledFor[conditionKey] = undefined;
				}
			}

			console.log('new feature flag=', featureFlag);
			featureFlag = await FeatureFlagModel.findByIdAndUpdate({ _id: featureFlagId }, featureFlag, { new: true });
			return response.status(200).json(featureFlag);
		} else {
			return response.status(400).send({ error: { message: 'invalid featureFlag id' } });
		}
	} catch (err) {
		console.log('error adding feature flag : ', err);
		return response.status(500).json(err);
	}
}


// add a new condition to featureFlags enabledFor 
export async function addCondition(request: Request, response: Response) {
	try {
		console.log('~~~~ request body=', request.body);
		const featureFlagId = request.params.id;
		const newVal = request.body.condition.value;
		const conditionKey = request.body.condition.key;
		const [conditionConfig] = EnabledForConditionsConfig.filter((c) => c.condition === conditionKey);

		let featureFlag = await FeatureFlagModel.findById({ _id: featureFlagId });

		if (featureFlag) { // if featureFlag is found

			if (conditionConfig.multiValue) { // if the condition is multiValue, then use array
				if (featureFlag.enabledFor[conditionKey].indexOf(newVal) < 0) { // make sure newVal doesn't exist already
					featureFlag.enabledFor[conditionKey].push(newVal);
				} else {
					return response.status(400).send({ error: { message: 'duplicate value' } });
				}
			} else { // if the condition value is not array but a string/number
				console.log('updating conditions value', request.body);
				featureFlag.enabledFor[conditionKey] = newVal;
			}

			featureFlag = await FeatureFlagModel.findByIdAndUpdate({ _id: featureFlagId }, featureFlag, { new: true });
			return response.status(200).json(featureFlag);
		}
	} catch (err) {
		console.log('error adding feature flag : ', err);
		return response.status(500).json(err);
	}
}


export async function deleteFeatureFlag(request: Request, response: Response) {
	try {

		// see if feature flag already exists for the application
		const featureFlagId = request.params.id;
		console.log('deleting feature flag with id=', featureFlagId);

		const removedFeatureFlag = await FeatureFlagModel.findByIdAndRemove({ _id: featureFlagId });
		return response.status(200).json(removedFeatureFlag);
	} catch (err) {
		console.log('error adding feature flag : ', err);
		return response.status(500).json(err);
	}
}

async function getAppFeatureFlags(request) {
	const app = request.params.app.toLowerCase();
	const featureFlags: IFeatureFlagModel[] = await FeatureFlagModel.find({ app });
	if (featureFlags) {
		return buildFlags(featureFlags, request.params.account);
	}
	return {};
}

function buildFlags(appfeatureFlags: IFeatureFlagModel[], account: string) {
	console.log('feature falgs for app=', appfeatureFlags);
	const flags = appfeatureFlags.map((feature) => {
		// console.log('feature=', feature);
		let isFeatureEnabledForAccount = false;
		if (feature.enabledFor.allNoneOrFewSelected === 'all') {
			isFeatureEnabledForAccount = true;
		}

		if (feature.enabledFor.allNoneOrFewSelected === 'selected') {
			try {
				if (feature.enabledFor.accounts && feature.enabledFor.accounts.length > 0) {
					isFeatureEnabledForAccount = feature.enabledFor.accounts.indexOf(account) > 0;
				}

				if (feature.enabledFor.accountEndsWith && feature.enabledFor.accountEndsWith.length > 0) {
					const arrConditions = feature.enabledFor.accountStartsWith.filter((condition) => account.endsWith(condition));
					isFeatureEnabledForAccount = arrConditions.length > 0;
				}

				if (feature.enabledFor.accountStartsWith && feature.enabledFor.accountStartsWith.length > 0) {
					const arrConditions = feature.enabledFor.accountStartsWith.filter((condition) => account.startsWith(condition));
					isFeatureEnabledForAccount = arrConditions.length > 0;
				}

				if (feature.enabledFor.accountLastDigitLT) {
					isFeatureEnabledForAccount =
						parseInt(account.slice(-1)) < feature.enabledFor.accountLastDigitLT;
				}

				if (feature.enabledFor.accountLastDigitGT) {
					isFeatureEnabledForAccount =
						parseInt(account.slice(-1)) > feature.enabledFor.accountLastDigitGT;
				}

			} catch (err) {
				console.log('ended in error when customizing FeatureFlag: ', err)
				isFeatureEnabledForAccount = false;
			}
		}

		const keyValProps = {};

		feature.KeyVals.forEach((kv) => {
			console.log('kv.key=', kv.key);
			keyValProps[kv.key] = kv.value;
		})
		// console.log('keyvalProps=', keyValProps);
		const { key, description } = feature;
		return { key, description, active: isFeatureEnabledForAccount, ...keyValProps };
	});
	return flags;
}
