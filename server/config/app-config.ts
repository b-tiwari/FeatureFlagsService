interface COMMON_CONFIG {
  PORT: string;
  API_Version: string
}

interface ENV_CONFIG {
  MONGO_URL: string;
}

interface APP_CONFIG extends COMMON_CONFIG, ENV_CONFIG {
}

const prodDBConnStr = process.env.MONGODB_PROD_URL || 'mongodb://admin:admin@127.0.0.1:27017/feature-flags';
console.log('process.env.MONGODB_PROD_URL=', prodDBConnStr);

const commonConfig: COMMON_CONFIG = {
  PORT: process.env.PORT || '2000',
  API_Version: 'v1'
};

const devConfig: ENV_CONFIG = {
  MONGO_URL: 'mongodb://localhost/feature-flags'
};

const testConfig: ENV_CONFIG = {
  MONGO_URL: 'mongodb://localhost/feature-flags'
};

const prodConfig: ENV_CONFIG = {
  MONGO_URL: prodDBConnStr
}

function getEnvConfig(env: string) {
  switch (env) {
    case 'prod':
    case 'production':
      return prodConfig;
    case 'test':
      return {};
    default:
      return devConfig;

  }
}

console.log('process.env.NODE_ENV=', process.env.NODE_ENV);

const AppConfig: APP_CONFIG = {
  ...commonConfig,
  ...getEnvConfig(process.env.NODE_ENV || 'dev')
} as APP_CONFIG;

export default AppConfig;
