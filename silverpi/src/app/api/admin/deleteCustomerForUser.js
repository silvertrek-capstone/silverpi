import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



// Inserts a customer for the given user
// If user is null, adds to the logged in user.
// Obj should have cust_num and using: false.
export async function deleteCustomerForUser(user_id, cust_num) {
    try {

        // Check if we are modifying us or another user
        if (user_id) {
            const { SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SUPABASE_URL } = process.env
            // Have to create it this way to work as a service_role send
            const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
            // Update the profiles data with the new info
            const {data, error} = await supabase
                .from('customer_to_user')
                .delete()
                .eq('cust_num', cust_num)
                .eq('user_id', user_id);
            if (error) {
                throw new Error(error);
            }
        } else { // Updating US, use RLS to do update
            const cookieStore = cookies();
            const supabase = createServerComponentClient({ cookies: () => cookieStore });
            // Update our profile
            const {data, error} = await supabase
                .from('customer_to_user')
                .delete()
                .eq('cust_num', cust_num);
            if (error) {
                console.log(error);
                throw new Error(error);
            }
        }

        return { data: null, error: null };
    } catch (e) {
        console.log(e);
        return { data: null, error: e.toString() }
    }
}