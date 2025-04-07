// /app/api/outlookClient.ts

import axios from 'axios';
import qs from 'qs';

const tenantId = process.env.OUTLOOK_TENANT_ID;
const clientId = process.env.OUTLOOK_CLIENT_ID;
const clientSecret = process.env.OUTLOOK_CLIENT_SECRET;
const redirectUri = process.env.OUTLOOK_REDIRECT_URI;

export async function getAccessToken(authCode: string) {
  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const data = {
    client_id: clientId,
    scope: 'https://graph.microsoft.com/.default',
    code: authCode,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    client_secret: clientSecret,
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await axios.post(url, qs.stringify(data), { headers });
  return response.data;
}

export async function getInboxEmails(accessToken: string) {
  const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
