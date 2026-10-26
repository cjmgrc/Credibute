import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src') } },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.js'],
        css: false,
    },
});
