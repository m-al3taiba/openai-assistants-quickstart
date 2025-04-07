import { NextResponse } from 'next/server'

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.OUTLOOK_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.OUTLOOK_REDIRECT_URI!,
    response_mode: 'query',
    scope: 'https://graph.microsoft.com/.default',
  })

  const authUrl = `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/authorize?${params.toString()}`

  return NextResponse.redirect(authUrl)
}
