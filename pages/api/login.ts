import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') return res.status(404).json({ message: 'Method not supported' });

  return new Promise((resolve) => {
    console.log('Login API');
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      proxyRes.on('data', (chunk) => {
        body = body + chunk;
      });
      proxyRes.on('end', () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);

          // Convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt),
          });

          (res as NextApiResponse).status(200).json({ message: 'Login successfully' });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'Something went wrong' });
        }

        resolve(true);
      });
    };

    // Forward to API server
    proxy.web(req, res, {
      target: process.env.SERVER_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    // next after proxyRes
    proxy.once('proxyRes', handleLoginResponse);
  });
}
