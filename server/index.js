const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(require('cors')());

// Simple contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact:', { name, email, message });
  // In production, integrate with email service here.
  res.json({ ok: true, message: 'Message received (placeholder)' });
});

// Serve client in production
const distPath = path.join(__dirname, '..', 'client', 'dist');
if (require('fs').existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.listen(port, () => console.log(`Server listening on ${port}`));
