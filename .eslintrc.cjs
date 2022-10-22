/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['@typescript-eslint', 'vuejs-accessibility'],
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier',
        './.eslintrc-auto-import.json',
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    ignorePatterns: [
        'node_modules',
        'public',
        '.vscode',
        '*.d.ts',
        '.estlintrc-auto-import.json',
    ],
    rules: {
        'vue/multi-word-component-names': ['off'],
    },
};
