declare namespace NodeJS {
  interface IProcessEnv {
    readonly PORT: number;
    readonly MONGO_URL: string;
  }
}
