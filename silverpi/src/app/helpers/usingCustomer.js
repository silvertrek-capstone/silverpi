import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


export async function getCustNum() {
    try {
        const cookieStore = cookies()
        const supabase = createServerComponentClient({ cookies: () => cookieStore })
        // Select from customer_to_user where using is true
        const {data, error} = await supabase
            .from('customer_to_user')
            .select('cust_num')
            .eq('using', true)
            .single();
        if (error) {
            throw new Error(error)
        }
        // TODO: Causes error when user not logged in?
        const customer = data.cust_num;
        return {data: customer, error: null}
    } catch(e) {
        console.log(e)
        return {data: null, error: e}
    }
}
