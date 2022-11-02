const env = process.env;

export default () => ({
  port: env.PORT,
  database: {
    type: env?.DATABASE_TYPE,
    host: env?.DATABASE_HOST,
    port: +env?.DATABASE_PORT,
    database: env?.DATABASE,
    username: env?.DATABASE_USERNAME,
    password: env?.DATABASE_PASSWORD,
  },
  redis: {
    host: env?.REDIS_HOST,
    port: +env?.REDIS_PORT,
    password: env?.REDIS_PASSWORD,
  },
  jwt: {
    accessSecret: env?.JWT_ACCESS_SECRET,
    refreshSecret: env?.JWT_REFRESH_SECRET,
  },
  sessionSecret: env?.SESSION_SECRET,
  paymentToken: env?.PAYMENT_TOKEN,
  email: {
    host: env?.EMAIL_HOST,
    user: env?.EMAIL_USER,
    pass: env?.EMAIL_PASS,
    port: env?.EMAIL_PORT,
  },
});
