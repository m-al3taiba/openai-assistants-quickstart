import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('Received file:', body)

    return NextResponse.json({
      success: true,
      message: 'File received successfully.',
      data: body,
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
