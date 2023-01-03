import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./openapi.yaml",
    output: {
      client: "axios-functions",
      target: "./generated.ts",
      override: {
        mutator: {
          path: "./utils/custom-axios.ts",
          name: "appInstance",
        },
      },
    },
  },
});
