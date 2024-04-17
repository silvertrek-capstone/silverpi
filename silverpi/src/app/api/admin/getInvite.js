import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


// Returns both invites and the invites related customer numbers
// For the given id
export async function getInvite(id) {
    try {

        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        // Get invites
        const { data, error } = await supabase
            .from('invites')
            .select()
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error);
        }

        // Get related customer numbers
        const { data: data2, error: error2 } = await supabase
            .from('invite_to_customer')
            .select()
            .eq('invite_id', id);
        if (error2) {
            throw new Error(error);
        }

        const invite = {
            ...data,
            customers: data2,
        }

        return { data: invite, error: null };
    } catch (e) {
        return { data: null, error: e }
    }
}