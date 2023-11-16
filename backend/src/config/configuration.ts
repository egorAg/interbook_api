import * as process from "process";

export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  environment: process.env.ENV ?? 'local',
  database: {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: process.env.ENV !== 'prod',
  },
  secrets: {
    jwt_access: process.env.JWT_ACCESS,
    jwt_refresh: process.env.JWT_REFRESH,
  }
});
