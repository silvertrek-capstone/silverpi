import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function nothing() {
  // Check if we have a session, if we do, redirect to home
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data, error } = await supabase.auth.getSession()
  const {session} = data; // get the session object

  // if no session or an error occured, redirect to login
  if (session === null || error) {
    redirect('/login')
  } else { // Else, redirect to the home page
    redirect('/home')
  }

}
