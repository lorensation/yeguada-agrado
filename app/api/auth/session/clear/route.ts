import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Clear the session cookie
export async function POST() {
  try {
    // Delete the authentication cookie
    const cookieStore = await cookies();
    cookieStore.delete('sb-access-token');
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Session cookie cleared' 
    });
  } catch (error) {
    console.error('Error clearing session cookie:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to clear session' }, 
      { status: 500 }
    );
  }
}