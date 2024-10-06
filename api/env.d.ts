declare namespace NodeJS {
  interface IProcessEnv {
    readonly PORT: number;
    readonly MONGO_URL: string;
    readonly NODE_ENV: "development | production";
    BASE_URL: string;
    readonly JWT_KEY: string;
    readonly JWT_Expire: string;
    readonly JWT_RESET_EXPIRE: string;
    readonly JWT_RESET_EXPIRE: string;
    readonly EMAIL_HOST: string;
    readonly EMAIL_USERNAME: string;
    readonly EMAIL_PASSWORD: string;
    readonly APP_NAME: string;
  }
}
