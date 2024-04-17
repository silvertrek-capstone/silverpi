import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function deleteInvite(id) {
    try {
        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        // Update our profile
        const { data, error } = await supabase
            .from('invites')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(error);
        }

        return { data: id, error: null };
    } catch (e) {
        return { data: null, error: e }
    }
}