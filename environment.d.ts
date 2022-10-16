declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WEBSOCKET_API_KEY: string;
      NEXT_PUBLIC_CONTRACT_ADDRESS: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}