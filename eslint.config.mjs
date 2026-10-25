import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals"),
  eslintConfigPrettier,
 globalIgnores([
  ".next/**",
  ".open-next/**",
  ".wrangler/**",
  "out/**",
  "build/**",
  ".lighthouseci/**",
  "lhci_reports/**",
  "next-env.d.ts",
]),
]);

export default eslintConfig;
