import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



// Inserts a customer for the given user
// If user is null, adds to the logged in user.
// Obj should have cust_num and using: false.
export async function addCustomerToInvite(invite_id, cust_num) {
    try {
        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        // Update our profile
        const { data, error } = await supabase
            .from('invite_to_customer')
            .insert({invite_id, cust_num});
        if (error) {
            console.log(error)
            throw new Error(error);
        }

        return { data: null, error: null };
    } catch (e) {
        // console.log(e);
        return { data: null, error: e }
    }
}