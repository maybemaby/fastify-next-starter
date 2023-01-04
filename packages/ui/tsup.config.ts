import { defineConfig } from "tsup";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import type { Options } from "tsup";

export default defineConfig((opts) => {
  return {
    esbuildPlugins: [cssModulesPlugin({})],
  } as Options;
});
