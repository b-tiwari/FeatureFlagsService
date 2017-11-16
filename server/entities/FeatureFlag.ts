export interface FeatureFlag {
  app: string;
  key: string;
  description: string;
  enabledFor: EnabledFor;
  KeyVals: [KeyVal];
}

export interface FeatureFlagForAccount {
  key: string;
  active: string;
  description: string;
  [key: string]: string;
}



export interface KeyVal {
  key: string;
  value: string;
}

interface ConditionConfig {
  condition: string;
  options?: { value: string, text: string }[];
  multiValue: boolean;
  label?: string;
  type?: 'text' | 'email' | 'number';
  defaultValue?: string;
}

export const EnabledForConditionsConfig: ConditionConfig[] = [
  {
    condition: 'allNoneOrFewSelected',
    multiValue: false
  },
  { condition: 'accountEndsWith', type: 'text', multiValue: true },
  { condition: 'accountStartsWith', type: 'text', multiValue: true },
  { condition: 'accountLastDigitLT', type: 'number', multiValue: false },
  { condition: 'accountLastDigitGT', type: 'number', multiValue: false },
  { condition: 'accounts', type: 'text', multiValue: true }
];

export interface EnabledFor {
  allNoneOrFewSelected: 'all' | 'none' | 'selected';
  accountEndsWith?: [string];
  accountStartsWith?: [string];
  accountLastDigitGT?: number;
  accountLastDigitLT?: number;
  accounts?: [string]
}

