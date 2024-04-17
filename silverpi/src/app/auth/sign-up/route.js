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

  const res1 = await createSupabaseUser(supabase, signupData);
  if (res1.error) {
    const { message, status } = res1.error;
    console.log(message);
    return NextResponse.json({ error: message }, { status })
  }

  const newUser = res1.data.user; // New user object.

  // Check if we have an invite id, should be required
  if (!signupData.inviteId) {
    return NextResponse.json({ error: "Invite ID is required" }, { status: 422 })
  }

  // Now, handle adding all the invites
  // First, get all the customers related to the invite number
  const invites = await getCustomersForInvite(supabase, signupData.inviteId);
  if (invites.error || !invites.data?.length) {
    return NextResponse.json({ error: "Invalid Invitation" }, { status: 422 })
  }

  // Now, using the invites, add them to the invite table.
  const customers = await addCustomersToUser(supabase, invites.data, newUser)
  if (customers.error) {
    return NextResponse.json({ error: "Failed to add customers to user" }, { status: 422 })
  }

  // Now, burn the invite, one user per invite only, so it stays clean.
  await burnInvite(supabase, signupData.inviteId);

  // Finally, add the profile data to the profiles table
  const profile = await addNewProfile(supabase, newUser, signupData);
  if (profile.error) {
    return NextResponse.json({ error: "Failed to add new profile" }, { status: 422 })
  }
  

  return NextResponse.json({ error: null }, { status: 200 })

}


// Helper functions, each one belongs in a step.

async function createSupabaseUser(supabase, signupData) {
  const { email, password } = signupData;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

async function getCustomersForInvite(supabase, inviteId) {
  const { data, error } = await supabase
    .from('invite_to_customer')
    .select('cust_num')
    .eq('invite_id', inviteId);
  return {data, error};
}

async function addCustomersToUser(supabase, invites, newUser) {
  // Loop over invites, create an array of inserts
  const mapped = invites.map((e, i) => {
    return { user_id: newUser.id, cust_num: e.cust_num, using: i === 0 };
  })
  // Kind messy, but add the customer - user relation here.
  const {data, error} = await supabase
    .from('customer_to_user')
    .insert(mapped)
    .select();
  return {data, error};
}

async function addNewProfile(supabase, newUser, signupData) {
  const {data, error} = await supabase
    .from('profiles')
    .insert({
      id: newUser.id,
      first_name: signupData.first,
      last_name: signupData.last,
      role_id: 2
    });
  return {data, error};
}

// Burn invite function, deletes the invite from the invites table (which should cascade to the sub table)
async function burnInvite(supabase, inviteId) {
  return supabase
    .from('invites')
    .delete()
    .eq('id', inviteId);
}