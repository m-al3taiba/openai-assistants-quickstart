import { NextResponse } from 'next/server';
import axios from 'axios';

const BITRIX_WEBHOOK_URL = "https://onplan.bitrix24.com/rest/84/bru9ot41vw9a00uw/calendar.event.add.json";

export async function POST(req) {
  try {
    const { title, start, end } = await req.json();

    const payload = {
      entry: {
        NAME: title,
        DATE_FROM: start,
        DATE_TO: end,
        DESCRIPTION: "Created by AI Assistant"
      }
    };

    const response = await axios.post(BITRIX_WEBHOOK_URL, payload);
    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Bitrix Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
