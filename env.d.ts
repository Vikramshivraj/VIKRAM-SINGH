
interface Window {
  // aistudio is made optional to match the environment's global Window definition and prevent modifier mismatch errors.
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
