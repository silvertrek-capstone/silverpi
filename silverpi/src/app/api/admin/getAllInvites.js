import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Returns the role of the logged in user.
export async function getAllInvites() {
    try {
        const cookieStore = cookies()
        const supabase = createServerComponentClient({ cookies: () => cookieStore })

        // Run a select on the profiles table, get the role id.
        const {data, error} = await supabase
            .from('invites')
            .select();

        // Check for error
        if (error) {
            throw new Error(error);
        }

        // return the role id
        return {data: data, error: null};

    } catch (e) {
        return { data: null, error: e.toString() };
    }
}