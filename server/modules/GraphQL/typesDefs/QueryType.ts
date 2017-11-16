const queryType = [`
  type Query {
    featureFlags(app: String!): [FeatureFlag]
  }
`];

export default queryType
