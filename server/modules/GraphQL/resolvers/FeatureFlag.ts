import FeatureFlagsQuery from './Queries/FeatureFlagsQuery';

const Mutation = {
  addFeatureFlag: (args) => {
    const { app, featureFlag } = args;
    return {
      test: 'test'
    }
  }
};

const Query = {
  FeatureFlagsQuery
}
