import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



// Removes a customer from an invite.
export async function removeCustomerFromInvite(invite_id, cust_num) {
    try {

        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        // Delete the customer.
        const { data, error } = await supabase
            .from('invite_to_customer')
            .delete()
            .eq('invite_id', invite_id)
            .eq('cust_num', cust_num);
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