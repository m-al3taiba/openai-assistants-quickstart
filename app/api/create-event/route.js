import { NextResponse } from 'next/server';

const BITRIX_USER_ID = "84"; // Your user ID
const BITRIX_WEBHOOK_URL = `https://onplan.bitrix24.com/rest/${BITRIX_USER_ID}/bru9ot41vw9a00uw/calendar.event.add.json?from=${BITRIX_USER_ID}`;

export async function POST(req) {
  try {
    const { title, start, end } = await req.json();

    const payload = {
      fields: {
        NAME: title,
        DATE_FROM: start,
        DATE_TO: end,
        ATTENDEES_CODES: [`U${BITRIX_USER_ID}`],
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
