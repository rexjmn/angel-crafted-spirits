import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    
    // Asegura que la base sea '/'
    base: '/',
    
    // Incluye todos los tipos de archivos necesarios
    assetsInclude: [
        '**/*.glb',
        '**/*.gltf',
        '**/*.hdr',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.mp4',  // Añadido soporte para videos
        '**/*.webm', // Añadido soporte para videos webm
        '**/*.svg'   // Añadido soporte para SVG
    ],

    // Resolución de alias para importaciones más limpias
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@components': resolve(__dirname, 'src/components')
        }
    },

    // Configuración de build optimizada
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        minify: 'esbuild',
        emptyOutDir: true, // Limpia el directorio de salida antes de build
        
        rollupOptions: {
            output: {
                // Organización de archivos por tipo
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
                
                // División de chunks
                manualChunks: {
                    'vendor': ['react', 'react-dom'],
                    'three': ['three'],
                    'gsap': ['gsap'],
                },
                
                // Nombres de archivos consistentes
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js'
            }
        },
        
        // Configuraciones de optimización
        target: 'es2018',
        cssCodeSplit: true,
        cssTarget: 'chrome61',
        assetsInlineLimit: 4096
    },

    // Configuración del servidor de desarrollo
    server: {
        port: 3000,
        strictPort: true,
        host: true,
        open: true
    },

    // Optimización de dependencias
    optimizeDeps: {
        include: ['react', 'react-dom', 'three', 'gsap'],
        exclude: []
    },

    // Configuración de preview
    preview: {
        port: 4173,
        strictPort: true,
        host: true,
        open: true
    }
});
