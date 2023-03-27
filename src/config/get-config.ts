import {
  Config,
  Environment,
  ProcessVariables,
} from '$/src/interface/types/config.type.js';
import { getLocalConfig } from '$/src/config/get-local.config.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function getConfig(processVariables: ProcessVariables): Config {
  const environment: Environment = processVariables.ENV || 'local';
  switch (environment) {
    case 'local':
      return getLocalConfig(processVariables);
  }
}
