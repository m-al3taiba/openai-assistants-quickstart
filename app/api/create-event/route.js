import { NextResponse } from 'next/server';

const BITRIX_WEBHOOK_URL = "https://onplan.bitrix24.com/rest/84/bru9ot41vw9a00uw/calendar.event.add.json";

export async function POST(req) {
  try {
    const { title, start, end } = await req.json();

    const payload = {
      entry: {
        NAME: title,
        DATE_FROM: start,
        DATE_TO: end,
        FROM: "84", // <-- test user fakhar
        DESCRIPTION: "Created by AI Assistant"
      }
    };

    const response = await fetch(BITRIX_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
