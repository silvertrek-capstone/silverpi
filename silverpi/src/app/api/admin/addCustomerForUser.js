import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'



// Inserts a customer for the given user
// If user is null, adds to the logged in user.
// Obj should have cust_num and using: true.
export async function addCustomerForUser(user_id, obj) {
    try {

        // Check if we are modifying us or another user
        if (user_id) {
            const { SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SUPABASE_URL } = process.env
            // Have to create it this way to work as a service_role send
            const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
            // Update the profiles data with the new info
            const {data, error} = await supabase
                .from('customer_to_user')
                .insert({user_id, ...obj});
            if (error) {
                throw new Error(error);
            }
        } else { // Updating US, use RLS to do update
            const cookieStore = cookies();
            const supabase = createServerComponentClient({ cookies: () => cookieStore });
            // Update our profile
            const {data, error} = await supabase
                .from('customer_to_user')
                .insert(obj);
            if (error) {
                throw new Error(error);
            }
        }

        return { data: null, error: null };
    } catch (e) {
        // console.log(e);
        return { data: null, error: e.toString() }
    }
}