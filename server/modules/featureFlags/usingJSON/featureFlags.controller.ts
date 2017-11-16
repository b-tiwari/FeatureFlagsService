// import { Request, Response } from 'express';

// export async function GetFeatursFlags(req: Request, res: Response) {
// 	try {
// 		console.log('params=', req.params);
// 		return res.status(200).json(getAppFeatureFlags(req));
// 	} catch (err) {
// 		return res.status(500).json(err);
// 	}
// }

// function getAppFeatureFlags(req) {
// 	const app = req.params.app;

// 	switch (app) {
// 		case 'cbui':
// 			return buildFlags('cbui', req.params.account);
// 		default:
// 			return {};
// 	}
// }

// function buildFlags(appfeatureFlags, account) {
// 	const flags = appfeatureFlags.features.map((feature) => {
// 		// console.log('feature=', feature);
// 		let isFeatureEnabledForAccount = false;
// 		if (feature.active) {
// 			isFeatureEnabledForAccount = true;
// 		}

// 		if (feature.enabledFor) {
// 			try {
// 				if (feature.enabledFor.accounts) {
// 					isFeatureEnabledForAccount = feature.enabledFor.accounts.includes(account);
// 				}

// 				if (feature.enabledFor.accountEndsWith) {
// 					isFeatureEnabledForAccount = feature.enabledFor.accountEndsWith.includes(account.slice(-1));
// 				}

// 				if (feature.enabledFor.accountLastDigitLT) {
// 					isFeatureEnabledForAccount =
// 						parseInt(account.slice(-1)) < parseInt(feature.enabledFor.accountLastDigitLT);
// 				}

// 				if (feature.enabledFor.accountLastDigitGT) {
// 					console.log(parseInt(account.slice(-1)));
// 					console.log(parseInt(feature.enabledFor.accountLastDigitGT));
// 					isFeatureEnabledForAccount =
// 						parseInt(account.slice(-1)) > parseInt(feature.enabledFor.accountLastDigitGT);
// 				}

// 				if (feature.enabledFor.accountLastDigitLTE) {
// 					isFeatureEnabledForAccount =
// 						parseInt(account.slice(-1)) <= parseInt(feature.enabledFor.accountLastDigitLTE);
// 				}

// 				if (feature.enabledFor.accountLastDigitGTE) {
// 					isFeatureEnabledForAccount =
// 						parseInt(account.slice(-1)) >= parseInt(feature.enabledFor.accountLastDigitGTE);
// 				}
// 			} catch (err) {
// 				isFeatureEnabledForAccount = false;
// 			}
// 		}

// 		const { enabledFor, ...otherProps } = feature;
// 		return { ...otherProps, active: isFeatureEnabledForAccount };
// 	});

// 	return flags;
// }
