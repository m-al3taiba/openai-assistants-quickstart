import { NextResponse } from 'next/server';

const BITRIX_WEBHOOK_URL = "https://onplan.bitrix24.com/rest/84/fb9hd7gcjaygtb6p/calendar.event.add.json";

export async function POST(req) {
  try {
    const { title, start, end } = await req.json();

    const payload = {
      event: {
        NAME: title,
        DATE_FROM: start,
        DATE_TO: end,
        DESCRIPTION: "Created by AI Assistant",
        OWNER_ID: 84,
        ATTENDEES_CODES: ["U84"]
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
