module.exports = {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["**/*.ts", "**/*.tsx"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "at-rule-empty-line-before": null,
    "comment-empty-line-before": null,
    "declaration-block-trailing-semicolon": null,
    "declaration-empty-line-before": null,
    "max-empty-lines": 2,
    "no-descending-specificity": null,
    "rule-empty-line-before": null,
  },
};
