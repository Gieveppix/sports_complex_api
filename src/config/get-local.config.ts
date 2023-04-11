import { Config, ProcessVariables } from '$/src/interface/types/config.type.js';
import dotenv from 'dotenv';

dotenv.config();

export function getLocalConfig(processVariables: ProcessVariables): Config {
  return {
    port: process.env.PORT,
    environment: 'local',
    logLevel: processVariables.LOG_LEVEL ?? 'info',
    jwt_secret: process.env.JWT_SECRET ?? 'tugi',
    database: {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_NAME,
      port: Number(process.env.PG_PORT),
      password: process.env.PG_PASSWORD,
      ssl: false,
    },
    sendgrid: {
      api_key: process.env.SENDGRID_API_KEY,
      from_email: process.env.SENDGRID_FROM_EMAIL,
      email_username: process.env.EMAIL_USERNAME,
      email_password: process.env.EMAIL_PASSWORD,
      sender_name: process.env.EMAIL_FROM,
    },
  };
}
