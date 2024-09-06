/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly ADMIN_USERNAME: string;
  readonly ADMIN_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
