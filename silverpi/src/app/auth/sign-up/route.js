import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


// TODO: break up into functions
export async function POST(request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  // Create a nice object with all the form data
  const signupData = {
    email: formData.get('email'),
    password: formData.get('password'),
    rePassword: formData.get('re-password'),
    first: formData.get('first-name'),
    last: formData.get('last-name'),
    inviteId: formData.get('invite-id') || null, // Get the invite id, or null if non existent.
    custNum: null,
  }
  // First, check that password and rePassword match
  if (signupData.password !== signupData.rePassword) {
    return NextResponse.redirect(`${requestUrl.origin}/signup`, {status: 301})
  }


  // First, create a signup
  const response = await supabase.auth.signUp({
    email: signupData.email,
    password: signupData.password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  // Next, check that there was not an error
  if (response.error !== null) {
    console.log('error1', response.error)
    return NextResponse.redirect(`${requestUrl.origin}/signup`, {status: 301})
  }

  const userData = response.data.user // Data about the user, id, email, etc.

  // Next, if we have an invite id, fetch the customer number related to the invite id.
  if (signupData.inviteId) {
    // Make a search on the invite table for customer numbers
    let response2 = await supabase
      .from('invites')
      .select('cust_num')
      .eq('id', signupData.inviteId);
  
      console.log(response2)
      // If error, quit.
      if (response2.error) {
        console.log('error2', response2.error)
        return NextResponse.redirect(`${requestUrl.origin}/signup`, {status: 301})
      }
      if (response2.data.length) {
        signupData.custNum = response2.data[0].cust_num;

        // Kind messy, but add the customer - user relation here.
        await supabase.from('customer_to_user').insert({user_id: userData.id, cust_num: signupData.custNum})
      }
  }

  // If no error, add the first and last to the profiles table
  let response3 = await supabase
    .from('profiles')
    .insert({
      id: userData.id,
      first_name: signupData.first,
      last_name: signupData.last,
      role_id: signupData.custNum ? 2 : null, // If we got a valid customer number, set their role to customer off the bat.
    })
  
  console.log(response3)

  if (response3.error) {
    console.log('error3', response3.error)
    return NextResponse.redirect(`${requestUrl.origin}/signup`, {status: 301})
  }

  return NextResponse.redirect(`${requestUrl.origin}/home`, {
    status: 301,
  })
}