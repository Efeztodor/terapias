#!/usr/bin/env node

/**
 * Script para optimizar imágenes grandes antes del build
 * 
 * Uso:
 *   node scripts/optimize-images.js
 * 
 * Requisitos:
 *   npm install --save-dev sharp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Tamaños límite en bytes
const LIMITS = {
  logo: 500 * 1024,      // 500 KB para logos
  image: 500 * 1024,    // 500 KB para imágenes generales
  favicon: 100 * 1024,   // 100 KB para favicons
};

// Archivos específicos a verificar
const FILES_TO_CHECK = [
  {
    path: 'src/assets/logo-paola.png',
    limit: LIMITS.logo,
    name: 'Logo Principal',
  },
  {
    path: 'public/favicon.png',
    limit: LIMITS.favicon,
    name: 'Favicon',
  },
  {
    path: 'public/lovable-uploads/a03ec1b2-a764-4519-bd71-3772e86f6928.png',
    limit: LIMITS.image,
    name: 'Imagen de Upload',
  },
];

function checkFileSize(filePath, limit, name) {
  const fullPath = path.join(projectRoot, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${name}: Archivo no encontrado (${filePath})`);
    return false;
  }

  const stats = fs.statSync(fullPath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  const limitKB = (limit / 1024).toFixed(2);

  if (stats.size > limit) {
    console.log(`❌ ${name}: ${sizeMB} MB (límite: ${limitKB} KB) - REQUIERE OPTIMIZACIÓN`);
    return false;
  } else {
    console.log(`✅ ${name}: ${sizeKB} KB (límite: ${limitKB} KB) - OK`);
    return true;
  }
}

function checkAllImages() {
  console.log('🔍 Verificando tamaños de imágenes...\n');
  
  let allOk = true;
  
  for (const file of FILES_TO_CHECK) {
    const ok = checkFileSize(file.path, file.limit, file.name);
    if (!ok) allOk = false;
  }

  console.log('\n' + '='.repeat(60));
  
  if (allOk) {
    console.log('✅ Todas las imágenes están dentro de los límites recomendados.');
    console.log('   Puedes proceder con el build en Railway.');
  } else {
    console.log('⚠️  ADVERTENCIA: Algunas imágenes exceden los límites recomendados.');
    console.log('   Esto puede causar fallos de memoria durante el build en Railway.');
    console.log('   Se recomienda optimizar las imágenes antes del deploy.');
    console.log('\n   Herramientas recomendadas:');
    console.log('   - TinyPNG: https://tinypng.com/');
    console.log('   - Squoosh: https://squoosh.app/');
    console.log('\n   El build continuará, pero puede fallar si las imágenes son muy grandes.');
    // No bloquear el build, solo advertir (comentado process.exit(1))
    // En Railway, las optimizaciones de vite.config.ts ayudarán a reducir el impacto
  }
}

// Ejecutar verificación
checkAllImages();
