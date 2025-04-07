export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const clientId = "local.67f3631691cf40.57239370";
  const clientSecret = "SqDtjlWxDtFQFA9ozZ6F8B86x4aPqn30mBd4kc7d60m76xyAad";
  const redirectUri = "https://squid-app-km6oj.ondigitalocean.app/api/oauth/callback";

  const tokenResponse = await fetch("https://oauth.bitrix.info/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code
    })
  });

  const tokens = await tokenResponse.json();

  return new Response(JSON.stringify(tokens, null, 2), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
