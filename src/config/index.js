require("dotenv").config();
const pjson = require("../../package.json");

const config = {
  project: process.env.PROJECT || pjson.name,
  version: process.env.VERSION || pjson.version,
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 3030,
  cors: process.env.CORS,
  secret: process.env.SECRET,
  company: process.env.COMPANY,
  url: process.env.URL,
  urlIssues: process.env.URLISSUES,
  /** Email Suport */
  serviceEmail: process.env.SERVICE_EMAIL,
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  /** MongoDB */
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  /** Postgresql */
  pgPort: process.env.PG_PORT,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD,
  pgHost: process.env.PG_HOST,
  pgName: process.env.PG_NAME,
  /** Postgresql Read */
  pgReadPort: process.env.PG_READ_PORT,
  pgReadUser: process.env.PG_READ_USER,
  pgReadPassword: process.env.PG_READ_PASSWORD,
  pgReadHost: process.env.PG_READ_HOST,
  pgReadName: process.env.PG_READ_NAME,
  /** Redis */
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisUser: process.env.REDIS_USER,
  redisPassword: process.env.REDIS_PASSWORD,
  /** Pwprefix */
  pwPrefix: process.env.PW_PREFIX,
  /** AWS */
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsDefaultRegion: process.env.AWS_DEFAULT_REGION,
  awsBucket: process.env.AWS_BUCKET,
  /** Firebase */
  firebase: {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
  },
  /** Telegram */
  telegramToken: process.env.TELEGRAM_TOKEN,
  dployToken: process.env.DPLOY_TOKEN,
  match365Token: process.env.MATCH365_TOKEN,
  coopfuturoToken: process.env.COOPFUTURO_TOKEN,
  iluminaToken: process.env.ILUMINA_TOKEN,
  redistToken: process.env.REDIST_TOKEN,
};

module.exports = { config };
