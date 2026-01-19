# CORS Bypass Proxy

A simple Node.js serverless function to bypass CORS restrictions. It works as a Vercel Serverless Function but includes a local Express server for development.

## Local Development

You can run the proxy server locally using the included Express adapter.

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the server**:
    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:8080`.

3.  **Usage**:
    Visit `http://localhost:8080/api/proxy?url=https://your-target-api.com`

## Deployment

### Deploy to Vercel

1.  **Install Vercel CLI** (Optional):
    ```bash
    npm i -g vercel
    ```
2.  **Deploy**:
    ```bash
    vercel
    ```
    Or simply push this repository to GitHub/GitLab and import it into your Vercel Dashboard. Vercel will automatically detect the configuration.

## API Usage

The proxy endpoint expects a `url` query parameter.

**Endpoint**: `/api/proxy`

**Query Parameters**:
- `url`: The absolute URL of the target API you want to fetch.

**Example**:
```
GET /api/proxy?url=https://jsonplaceholder.typicode.com/todos/1
```

## Security Note

By default, this proxy allows **Cross-Origin** requests from **any domain** (`Access-Control-Allow-Origin: *`).

**For Production**:
You should restrict the allowed origins to your specific frontend application to entirely prevent unauthorized use of your proxy.

1.  Open `api/proxy.js`.
2.  Update the `Access-Control-Allow-Origin` header:
    ```javascript
    // api/proxy.js
    res.setHeader('Access-Control-Allow-Origin', 'https://your-frontend-domain.com');
    ```
