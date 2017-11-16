import { strictEqual } from 'assert';
import { Document, Model, model, Schema } from 'mongoose';

import { FeatureFlag, EnabledFor } from '../../entities';

export interface IFeatureFlagModel extends FeatureFlag, Document {
}

export interface IEnabledForModel extends EnabledFor, Document {
}

export const EnabledForSchema = new Schema({
	allNoneOrFewSelected: { type: String, required: true, enum: ['all', 'none', 'selected'] },
	accountEndsWith: { type: [String], required: false },
	accountStartsWith: { type: [String], required: false },
	accountLastDigitGT: { type: Number, required: false },
	accountLastDigitLT: { type: Number, required: false },
	accounts: { type: [String], required: false }
}, { _id: false, useNestedStrict: true, strict: true, });
export const EnabledForModel: Model<IEnabledForModel> = model<IEnabledForModel>('EnabledFor', EnabledForSchema);

const FeatureFlagSchema = new Schema({
	app: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, 'app is required']
	},
	key: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, 'key is required'],
	},
	enabledFor: {
		type: EnabledForSchema,
		default: { allNoneOrFewSelected: 'none' },
		strictEqual: true
	},
	created_at: { type: Date, default: Date.now },
	description: { type: String, default: '' },
	KeyVals: { type: [{ key: String, value: String }], default: [] }
}, { strict: true });

FeatureFlagSchema.index({ app: 1, key: 1 }, { unique: true });



export const FeatureFlagModel: Model<IFeatureFlagModel> = model<IFeatureFlagModel>('FeatureFlags', FeatureFlagSchema);
