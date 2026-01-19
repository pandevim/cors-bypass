import express from 'express';
import handler from './api/proxy.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies if needed (though the handler reads req.body directly usually)
app.use(express.json());

// Redirect root to usage info or just handle everything at /api/proxy
app.get('/', (req, res) => {
    res.send('CORS Proxy Server is running. Go to <a href="/api/proxy">/api/proxy</a>');
});

// Mount the handler
// Vercel functions handle all methods, so we use app.all
app.all('/api/proxy', (req, res) => {
    return handler(req, res);
});

app.listen(PORT, () => {
    console.log(`Server is running locally at http://localhost:${PORT}`);
});
