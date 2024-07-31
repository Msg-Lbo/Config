// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
var pathResolve = function (dir) {
    return resolve(__dirname, ".", dir);
};
var alias = {
    '@': pathResolve("src")
};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ]
        }),
        Components({
            resolvers: [NaiveUiResolver()]
        })
    ],
    resolve: {
        alias: alias
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        proxy: {
            '/webui/api': {
                target: 'http://127.0.0.1:7897',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/webui\/api/, ''); }
            }
        }
    },
    base: './',
    build: {
        outDir: './app/dist',
    }
});
