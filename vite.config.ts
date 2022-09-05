import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { join, resolve } from 'path';
import SemiPlugin from '@necrobits/vite-plugin-semi-theme';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh({
            include: ['**/*.tsx'],
            exclude: [/\.stories\.(t|j)sx?$/, /node_modules/]
        }),
        SemiPlugin({
            theme: '@semi-bot/semi-theme-nyx-c',
            options: {
                include: resolve(__dirname, 'assets/scss/local.scss')
            }
        })
    ],
    cacheDir: 'node_modules/.vite',
    resolve: {
        alias: {
            '~': join(__dirname, 'src'),
            assets: resolve(__dirname, 'assets')
        }
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            external: ['react'],
            output: {
                format: 'esm',
                manualChunks: id => {
                    if (id.includes('node_modules')) {
                        return 'vendor'; // all other package goes here
                    }
                }
            }
        }
    }
});
