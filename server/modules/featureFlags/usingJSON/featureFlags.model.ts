// export default {
// 	cbui: {
// 		features: [
// 			{
// 				name: 'Thresholds',
// 				key: 'thresholds',
// 				active: false,
// 				enabledFor: {
// 					accounts: ['10020711', '662266']
// 				},
// 				description: 'Controls the Billing Alerts Thresholds'
// 			},
// 			{
// 				name: 'Enable Account Drawer',
// 				key: 'enable-account-drawer',
// 				active: false,
// 				enabledFor: {
// 					accountEndsWith: '8'
// 				},
// 				description: 'Control whether account drawer is rendered'
// 			},
// 			{
// 				name: 'UKDDPayment',
// 				key: 'UKDD',
// 				active: false,
// 				enabledFor: {
// 					accountLastDigitGT: 1
// 				},
// 				description: 'Enable / disable UKDD Payment option for UK customers'
// 			},
// 			{
// 				name: 'NLSEPAPayment',
// 				key: 'SEPA',
// 				active: false,
// 				enabledFor: {
// 					accountLastDigitLT: 2
// 				},
// 				description: 'Enable / disable SEPA Payment option for customers with EUR currency'
// 			},
// 			{
// 				name: 'Enable Mandate Form Sidebar',
// 				key: 'enable-mandate-form-sidebar',
// 				active: false,
// 				enabledFor: {
// 					accountEndsWith: ['0', '2', '4', '6', '8']
// 				},
// 				description: 'Controls whether wiretransfer sidebar is shown on manage payments page'
// 			},
// 			{
// 				name: 'Janus Api get AWS accounts failed, default response',
// 				key: 'janus-hasCloudAndFaws-defaultReponse',
// 				active: false,
// 				description:
// 				'What happens when Janus API fails for hasCloudAndFaws. Default to Cloud Only (false) or Cloud+FAWS (true)'
// 			},
// 			{
// 				name: 'Maintenance in progress',
// 				key: 'maintenance-in-progress',
// 				active: false,
// 				description:
// 				'Disable any updates to account from CBUI when maintenance work is in progress and show a notification on the website',
// 				type: 'warning',
// 				readOnlyAccess: false,
// 				message: 'Scheduled maintenance next week.'
// 			},
// 			{
// 				name: 'Dedicated release',
// 				key: 'enable-dedicated',
// 				active: true,
// 				description: 'Enable stories for dedicated accounts'
// 			},
// 			{
// 				name: 'FAWS Promo Code',
// 				key: 'faws-promo-code',
// 				active: false,
// 				description: 'Enable faws promo code'
// 			}
// 		]
// 	}
// };
