import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.OUTLOOK_CLIENT_ID
  const tenantId = process.env.OUTLOOK_TENANT_ID
  const redirectUri = process.env.OUTLOOK_REDIRECT_URI

  console.log("OUTLOOK_CLIENT_ID:", clientId)
  console.log("OUTLOOK_TENANT_ID:", tenantId)
  console.log("OUTLOOK_REDIRECT_URI:", redirectUri)

  if (!clientId || !tenantId || !redirectUri) {
    return NextResponse.json(
      { error: 'Missing required environment variables' },
      { status: 500 }
    )
  }

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    response_mode: 'query',
    scope: 'https://graph.microsoft.com/.default',
  })

  const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?${params.toString()}`
  return NextResponse.redirect(authUrl)
}
