import { NextRequest, NextResponse } from "next/server";

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const messages: ContactMessage[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessage = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    messages.push(body);

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
