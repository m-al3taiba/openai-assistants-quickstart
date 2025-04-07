import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/app/api/outlookClient';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenData = await getAccessToken(code);
    return NextResponse.json({ success: true, tokenData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
