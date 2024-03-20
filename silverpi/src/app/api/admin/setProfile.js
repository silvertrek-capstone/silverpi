import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Sets just the profile data for a given user.
// If user_id is null, set the logged in users profile, if set, set that profiles row instead

export async function setProfile(user_id, profile) {
    try {
        console.log(user_id, profile)
        if (!profile) {
            throw new Error('Profile parameter required');
        }
        // The id to return on success
        let idUpdated = null;
        // Check if we are modifying us or another user
        if (user_id) {
            const { SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SUPABASE_URL } = process.env
            // Have to create it this way to work as a service_role send
            const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
            // Update the profiles data with the new info
            const {data, error} = await supabase
                .from('profiles')
                .update(profile)
                .eq('id', user_id)
                .select()
                .single();
            if (error) {
                throw new Error(error);
            }
            // If no error, get the data
            idUpdated = data.id;
        } else { // Updating US, use RLS to do update
            const cookieStore = cookies();
            const supabase = createServerComponentClient({ cookies: () => cookieStore });
            // Update our profile
            const {data, error} = await supabase
                .from('profiles')
                .update(profile)
                .not('id', 'is', null)
                .select()
                .single();
            if (error) {
                throw new Error(error);
            }
            // If no error, get the data
            idUpdated = data.id;
        }

        return { data: idUpdated, error: null };
    } catch (e) {
        // console.log(e);
        return { data: null, error: e.toString() }
    }
}