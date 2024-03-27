import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getAllRoles() {
    try {
        // Create a supabase instance
        const cookieStore = cookies()
        const supabase = createServerComponentClient({ cookies: () => cookieStore })
        // Get all the roles.
        const { data, error } = await supabase
            .from('roles')
            .select();
        return { data, error };

    } catch (e) {
        return { data: null, error: e.toString() }
    }
}