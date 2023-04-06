import { Config, ProcessVariables } from '$/src/interface/types/config.type.js';

export function getLocalConfig(processVariables: ProcessVariables): Config {
  return {
    environment: 'local',
    logLevel: processVariables.LOG_LEVEL ?? 'debug',
    jwt_secret: processVariables.JWT_SECRET ?? 'tugi',
    authentication: {
      enabled: false,
      jwksUrl: '',
    },
    database: {
      user: 'root',
      host: 'localhost',
      database: 'sports_complex',
      port: 5432,
      password: 'pass',
      ssl: false,
    },
  };
}
