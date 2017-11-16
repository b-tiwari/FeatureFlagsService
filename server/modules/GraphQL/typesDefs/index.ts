import FeatureFlag from './FeatureFlagType';
import KeyVal from './KeyVal';
import MutationType from './MutationType';
import QueryType from './QueryType';
import SchemaType from './SchemaType';

export const typeDefs = [
  ...KeyVal,
  ...FeatureFlag,
  ...QueryType,
  ...MutationType,
  ...SchemaType
];
