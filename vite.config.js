import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import dotenv from 'dotenv';

// Cargar las variables de entorno según el modo
export default defineConfig(({ mode }) => {
    // Cargar el archivo .env correspondiente al modo (por ejemplo, .env.production)
    const env = dotenv.config({ path: `.env.${mode}` }).parsed || dotenv.config().parsed;

    // Convertir las variables de entorno en un objeto accesible en la configuración
    const envWithPrefix = Object.entries(env || {}).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc;
    }, {});

    const isProduction = mode === 'production';

    return {
        plugins: [
            react(),
            !isProduction &&
                visualizer({
                    open: true,
                    filename: 'bundle-analysis.html',
                    template: 'treemap',
                }),
            isProduction && viteCompression({ algorithm: 'brotliCompress' }),
        ].filter(Boolean),

        base: '/',

        assetsInclude: [
            '**/*.glb',
            '**/*.gltf',
            '**/*.hdr',
            '**/*.png',
            '**/*.jpg',
            '**/*.jpeg',
            '**/*.mp4',
            '**/*.webm',
            '**/*.svg',
        ],

        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@assets': resolve(__dirname, 'src/assets'),
                '@components': resolve(__dirname, 'src/components'),
            },
        },

        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            sourcemap: true,
            minify: 'esbuild',
            emptyOutDir: true,

            rollupOptions: {
                output: {
                    assetFileNames: (assetInfo) => {
                        let extType = assetInfo.name.split('.').at(1);
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = 'img';
                        } else if (/glb|gltf/i.test(extType)) {
                            extType = 'models';
                        } else if (/mp4|webm|ogv/i.test(extType)) {
                            extType = 'videos';
                        }
                        return `assets/${extType}/[name]-[hash][extname]`;
                    },
                    manualChunks: {
                        vendor: ['react', 'react-dom'],
                        three: ['three'],
                        gsap: ['gsap'],
                    },
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                },
            },

            target: 'es2018',
            cssCodeSplit: true,
            cssTarget: 'chrome61',
            assetsInlineLimit: 4096,
        },

        server: {
            port: 3000,
            strictPort: true,
            host: true,
            open: true,
        },

        optimizeDeps: {
            include: ['react', 'react-dom', 'three', 'gsap'],
            exclude: [],
        },

        preview: {
            port: 4173,
            strictPort: true,
            host: true,
            open: true,
        },

        // Añade las variables de entorno al objeto define
        define: {
            ...envWithPrefix,
        },
    };
});
