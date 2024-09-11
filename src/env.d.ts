/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    otherLocals: {
      test: string;
    };
  }
}

interface ImportMetaEnv {
  readonly ADMIN_USERNAME: string;
  readonly ADMIN_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Env {
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
}
