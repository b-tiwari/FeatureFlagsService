const mutationType = [`
type Mutation {
  addFeatureFlag(app: String!, featureFlag: FeatureFlag): FeatureFlag
}
`];

export default mutationType;
