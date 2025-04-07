export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
  
    const response = await fetch("https://oauth.bitrix.info/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.BITRIX_CLIENT_ID,
        client_secret: process.env.BITRIX_CLIENT_SECRET,
        redirect_uri: process.env.BITRIX_REDIRECT_URI,
        code
      }),
    });
  
    const tokens = await response.json();
  
    return new Response(JSON.stringify(tokens, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
  