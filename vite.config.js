import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'profile-uploader',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/upload-profile' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                if (data.image) {
                  const base64Data = data.image.split(';base64,').pop();
                  const buffer = Buffer.from(base64Data, 'base64');
                  const targetPath = path.resolve(__dirname, 'public/profile_pic.png');
                  fs.writeFileSync(targetPath, buffer);
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true }));
                } else {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'No image data provided' }));
                }
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})
