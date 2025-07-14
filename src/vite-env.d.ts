/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
