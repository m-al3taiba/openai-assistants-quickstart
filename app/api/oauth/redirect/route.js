export async function GET() {
  const clientId = "local.67f3631691cf40.57239370";
  const redirectUri = "https://squid-app-km6oj.ondigitalocean.app/api/oauth/callback";

  const authUrl = `https://oauth.bitrix.info/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
  return Response.redirect(authUrl);
}
