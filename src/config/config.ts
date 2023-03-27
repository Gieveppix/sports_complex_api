import { ProcessVariables } from '$/src/interface/types/config.type.js';
import { getConfig } from '$/src/config/get-config.js';

export const config = getConfig(process.env as unknown as ProcessVariables);
