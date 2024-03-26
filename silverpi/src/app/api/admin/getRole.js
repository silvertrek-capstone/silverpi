import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Returns the role of the logged in user.
export async function getRole() {
    try {
        const cookieStore = cookies()
        const supabase = createServerComponentClient({ cookies: () => cookieStore })

        // Run a select on the profiles table, get the role id.
        const {data, error} = await supabase
            .from('profiles')
            .select('role_id')
            .single(); // Dont need an eq, because RLS only allows select your profile row

        // Check for error
        if (error) {
            throw new Error(error);
        }

        // return the role id
        return {data: data?.role_id, error: null};

    } catch (e) {
        return { data: null, error: e.toString() };
    }
}