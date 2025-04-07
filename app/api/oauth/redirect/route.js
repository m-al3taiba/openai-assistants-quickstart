export async function GET() {
    const clientId = process.env.BITRIX_CLIENT_ID;
    const redirectUri = process.env.BITRIX_REDIRECT_URI;
  
    const authUrl = `https://oauth.bitrix.info/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
    return Response.redirect(authUrl);
  }
  