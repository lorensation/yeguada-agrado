import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// Get current session
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    const cookieStore = await cookies();
    const supabaseToken = cookieStore.get('sb-access-token')?.value;
    
    // If we already have a token, return success
    if (supabaseToken) {
      return NextResponse.json({ status: 'success', message: 'Session exists', token: supabaseToken });
    }
    
    // Otherwise check for active session in Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return NextResponse.json({ status: 'error', message: 'No active session' }, { status: 401 });
    }
    
    if (!data.session) {
      return NextResponse.json({ status: 'error', message: 'No active session' }, { status: 401 });
    }
    
    // Store the session token in a cookie
    cookieStore.set('sb-access-token', data.session.access_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Session stored in cookie', 
      token: data.session.access_token 
    });
  } catch (error) {
    console.error('Error in session API:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

// Store session from client-side login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    
    if (!token) {
      return NextResponse.json({ status: 'error', message: 'No token provided' }, { status: 400 });
    }
    
    const cookieStore = await cookies();
    // Store the session token in a cookie
    cookieStore.set('sb-access-token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return NextResponse.json({ status: 'success', message: 'Session stored in cookie' });
  } catch (error) {
    console.error('Error in session API:', error);
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}