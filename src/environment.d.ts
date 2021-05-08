declare global {
    namespace NodeJS {
      interface ProcessEnv {
        TOKEN: string;
        LOGSCHANNEL?: string;
      }
    }
  }

export {}