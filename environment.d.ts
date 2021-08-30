declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: '_DEV_' | '_PROD_';
      ORGANIZER: string;
      APP_NAME: string;
    }
  }
}
export {};
