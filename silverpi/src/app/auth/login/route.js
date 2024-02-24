import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  //console.log("DEBUG");

  if (!error) {                               // Valid Login - direct to home
    return NextResponse.redirect(`${requestUrl.origin}/home`, {
      status: 301,
    });
  } 
  else {                                      // Invalid Login - back to login with err status
    //console.error('Login error:', error);
    //console.error('Login user:', user);
    return NextResponse.redirect(`${requestUrl.origin}/login?loginError=true`);
  }
}


