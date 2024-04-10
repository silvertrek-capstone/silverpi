import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function setInvite(id, email) {
    try {
        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        // Update our profile
        const { data, error } = await supabase
            .from('invites')
            .upsert({id: id || null, email: email || null})
            .select()
            .single();
        if (error) {
            throw new Error(error);
        }

        return { data: data.id, error: null };
    } catch (e) {
        return { data: null, error: e }
    }
}