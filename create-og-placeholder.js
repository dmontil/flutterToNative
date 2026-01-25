#!/usr/bin/env node

/**
 * Simple script to create a basic OG image placeholder
 * Creates a 1200x630 PNG with text using Canvas API
 */

const fs = require('fs');
const { createCanvas, registerFont } = require('canvas');

// Create canvas with OG image dimensions
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#6366f1');
gradient.addColorStop(1, '#4f46e5');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add subtle pattern overlay
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
for (let i = 0; i < width; i += 40) {
  for (let j = 0; j < height; j += 40) {
    ctx.beginPath();
    ctx.arc(i + 20, j + 20, 1, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Main title
ctx.fillStyle = 'white';
ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
ctx.textAlign = 'center';
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
ctx.shadowBlur = 4;
ctx.shadowOffsetY = 2;

const titleY = height / 2 - 60;
ctx.fillText('Flutter to iOS', width / 2, titleY);
ctx.fillText('Playbook', width / 2, titleY + 80);

// Subtitle
ctx.font = '36px system-ui, -apple-system, sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.fillText('From Senior Flutter to Senior iOS Native', width / 2, titleY + 160);

// Price badge
ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
ctx.fillRect(width / 2 - 100, titleY + 200, 200, 50);
ctx.fillStyle = 'white';
ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
ctx.fillText('$49 Premium Guide', width / 2, titleY + 232);

// Icons (simple Unicode)
ctx.font = '48px system-ui, -apple-system, sans-serif';
ctx.fillText('🦋', width / 2 - 80, titleY - 120);
ctx.fillText('→', width / 2, titleY - 120);
ctx.fillText('📱', width / 2 + 80, titleY - 120);

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/og-image.png', buffer);

console.log('✅ Created og-image.png (1200x630px) in /public folder');
console.log('📱 Basic OG image placeholder ready for social sharing');