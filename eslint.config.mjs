import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Your custom rules override
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all", // Checks every argument in your functions
          argsIgnorePattern: "^_", // Allows (_plan) in your subscription interfaces
          varsIgnorePattern: "^_", // Allows (_tempVar) in your logic
          ignoreRestSiblings: true, // Helpful when destructuring Stripe or Supabase objects
        },
      ],
      "react-hooks/exhaustive-deps": "off",
      "@tailwindcss/suggest-canonical-classes": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
