export default async function handler(req, res) {
  // 1. Get the target URL from the query string
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Usage: /api/proxy?url=https://api.example.com");
  }

  // 2. Handle CORS Preflight (The "OPTIONS" request)
  // This tells the browser: "Yes, I allow other domains to hit me."
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to your specific domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // If it's just a preflight check, end here.
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 3. Fetch the data from the real API
    // We pass along the method (GET/POST) and body if it exists
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(url).host, // Override the host header to match the target
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // 4. Send the data back to your frontend
    const data = await response.text();
    res.status(response.status).send(data);

  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
