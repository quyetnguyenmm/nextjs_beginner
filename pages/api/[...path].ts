import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise((resolve) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    req.headers.cookie = '';

    // Forward to API server
    proxy.web(req, res, {
      target: process.env.SERVER_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    // next after proxyRes
    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
