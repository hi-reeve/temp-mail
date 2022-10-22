import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import VueTypeImports from 'vite-plugin-vue-type-imports';
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';
import VueRouter from 'unplugin-vue-router/vite';
import eslintPlugin from 'vite-plugin-eslint';
import Layouts from 'vite-plugin-vue-layouts';

import { VueRouterAutoImports } from 'unplugin-vue-router';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Components from 'unplugin-vue-components/vite';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        viteCompression(),
        VueRouter({
            dts: true,
            extensions: ['vue', 'tsx', 'jsx', 'ts', 'js'],
        }),
        vue(),
        vueJsx(),
        VueTypeImports(),
        eslintPlugin({ useEslintrc: true }),
        AutoImport({
            imports: [
                'vue',
                '@vueuse/core',
                '@vueuse/head',
                'pinia',
                VueRouterAutoImports,
                {
                    nanoid: ['nanoid'],
                    axios: [
                        // default imports
                        ['default', 'axios'], // import { default as axios } from 'axios',
                    ],
                    '@tanstack/vue-query': ['useMutation', 'useQuery'],
                    'date-fns': [
                        'addDays',
                        'addMonths',
                        'addWeeks',
                        'differenceInHours',
                        'differenceInMinutes',
                        'eachDayOfInterval',
                        'eachMinuteOfInterval',
                        'eachHourOfInterval',
                        'endOfMonth',
                        'endOfWeek',
                        'endOfYear',
                        'format',
                        'intervalToDuration',
                        'isFriday',
                        'isMonday',
                        'isSameDay',
                        'isSameMonth',
                        'isSaturday',
                        'isSunday',
                        'isThisMonth',
                        'isThisWeek',
                        'isThursday',
                        'isToday',
                        'isTuesday',
                        'isValid',
                        'isWednesday',
                        'startOfMonth',
                        'startOfToday',
                        'startOfWeek',
                        'startOfYear',
                    ],
                },
            ],
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
            dirs: [
                './src/composable/**',
                './src/store/**',
                './src/components/**/use*.ts',
            ],
        }),
        Components({
            dts: true,
            resolvers: [
                IconsResolver({
                    prefix: 'icon',
                    customCollections: ['nh-icons'],
                }),
            ],
            types: [
                {
                    from: '@vuepic/vue-datepicker',
                    names: ['DatePicker'],
                },
            ],
            extensions: ['vue', 'tsx'],
        }),
        Icons({
            compiler: 'vue3',
            customCollections: {
                'nh-icons': FileSystemIconLoader('./src/assets/icons'),
            },
        }),
        Layouts(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
