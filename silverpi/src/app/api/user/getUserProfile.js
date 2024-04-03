import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Gets all the data related to the logged in user.
// Admin level call, needs to use supabase service role key
// Set user_id as null or undefined to get the logged in users.
export async function getUserProfile(user_id) {
    try {
        let user = {}; // The user object.
        // Check if we want our user or someone elses
        if (user_id) { // If set, get someone elses
            // Create a supabase instance
            const { SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SUPABASE_URL } = process.env
            // Have to create it this way to work as a service_role send
            const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)
            const { data, error } = await supabase.auth.admin.getUserById(user_id);
            if (error) {
                throw new Error(error);
            }
            user = data.user;
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select()
                .eq('id', user_id)
                .single();
            if (profileError) {
                throw new Error(profileError);
            }
            user = { ...user, ...profileData };
        } else { // ELSE, get the logged in users information
            const cookieStore = cookies()
            const supabase = createServerComponentClient({ cookies: () => cookieStore })
            // Get the auth user
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                throw new Error(error);
            }
            // User should contain most of the information about a user
            user = data.session.user;
            // Now, we get the profile data
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select()
                .single(); // Dont need an eq, because RLS only allows select your profile row

            if (profileError) {
                throw new Error(profileError);
            }

            // If no error, append the profile data to the user object
            user = { ...user, ...profileData };
        }

        // Return the user/profile object
        return { data: user, error: null };

    } catch (e) {
        return { data: null, error: e.toString() };
    }
}