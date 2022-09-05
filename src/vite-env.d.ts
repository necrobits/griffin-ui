/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
    readonly VITE_SERVER_URL: string;
    readonly VITE_SERVER_API_PREFIX: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
