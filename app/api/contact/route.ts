import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, EmailData } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const data = await request.json() as EmailData;
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send email using our mail service
    const result = await sendContactEmail(data);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}