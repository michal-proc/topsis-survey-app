interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_PREFIX: string;
    readonly VITE_API_DOCS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}