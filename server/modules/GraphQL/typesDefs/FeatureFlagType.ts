const FeatureFlag = [
  `
    scalar JSON

    type FeatureFlag {
      id: String
      app: String!
      name: String
      key: String!
      active: Boolean
      description: String
      enabledFor: EnabledFor
      keyVals: [KeyVal]
      valuePairs: JSON
    }

    type EnabledFor {
      all: Boolean!,
      accountEndsWith: Number,
      accountLastDigitGT: Number,
      accountLastDigitLT: Number,
      accounts: [String]
    }
  `
];

export default FeatureFlag;
