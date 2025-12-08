import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

const distPath = path.join(__dirname, '..', 'dist');

app.use(express.static(distPath));

// SPA fallback: return index.html for any route not matching a static file
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
