import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  console.log(request);
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const searchParams = requestUrl.searchParams; // Information about the url.
  // Create a nice object with all the form data
  const signupData = {
    email: formData.get('email'),
    password: formData.get('password'),
    rePassword: formData.get('re-password'),
    first: formData.get('first-name'),
    last: formData.get('last-name'),
  }

  // First, create a signup
  const response = await supabase.auth.signUp({
    email: signupData.email,
    password: signupData.email,
  })

  // Next, check that there was not an error
  if (response.error !== null) {
    console.log(response.error)
    return NextResponse.next()
  }

  // If no error, add the first and last to the profiles table
  const userData = data.user // Data about the user, id, email, etc.
  const { error } = await supabase
    .from('countries')
    .insert({ 
      id: userData.id, 
      first_name: signupData.first,
      last_name: signupData.last,
    })

  if (error) {
    console.log(error)
    return NextResponse.next()
  }

  console.log(response)
  return NextResponse.redirect(`${requestUrl.origin}/home`, {
    status: 301,
  })
}