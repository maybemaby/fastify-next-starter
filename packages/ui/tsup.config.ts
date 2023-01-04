import { defineConfig } from "tsup";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import type { Options } from "tsup";

export default defineConfig((opts) => {
  return {
    entry: ["./src/index.tsx", "./src/hooks/index.ts"],
    external: ["react", "react-dom"],
    esbuildPlugins: [cssModulesPlugin({})],
  } as Options;
});
