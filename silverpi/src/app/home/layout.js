import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Navbar from "@/components/navbar.js"
import { redirect } from 'next/navigation.js'
import {handler} from "@/api/user/getCustomersForNums/route"

export default async function DashboardLayout({ children }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data, error } = await supabase.auth.getSession()
    const { session } = data
    // Check if not signed in. Because all pages are a child component of this one, this should handle security
    if (session === null || error) {
        redirect('/login')
    }
    const profile = await getProfileForUser(supabase, session);
    // Check profile, if no result, log out user, large error occured somewhere
    if (profile === null) {
        redirect('/login')
    }
    const customers = await getAllCustomersForUser(supabase, session);

    return (
        <>
            <section>
                <Navbar profile={profile} user={session.user} customers={customers} />
                {children}
            </section>

        </>
    );
}

async function getProfileForUser(supabase) {
    // Do a select to get profile data for user (name, role, etc)
    // RLS policy should result in just the users data
    const { data } = await supabase.from('profiles').select().single();
    // Above should result in a single row returned
    return data || null;
}

// Returns an array of all customers available to the current user.
async function getAllCustomersForUser(supabase) {
    // Do a select on all customer_to_user table, RLS policy should result in just the results we need
    const { data } = await supabase.from('customer_to_user').select();
    if (!data) {
        return [];
    }

    // Get just cust nums
    const ids = data.map((e) => {
        return e.cust_num;
    });

    // Get the actual customer information related to the ids
    const res = await handler(ids);
    const realCustomers = await res.json();

    // Left join the customer to user data on the real customers data.
    const joined = leftJoin(data, realCustomers.data, 'cust_num', 'customer')

    // Now, sort by the "using" column, so that the one being used is in first
    joined.sort((a, b) => {
        return b.using - a.using
    });
    
    return joined

}


// helper function
function leftJoin(objArr1, objArr2, key1, key2) {
    return objArr1.map(
        anObj1 => ({
            ...objArr2.find(
                anObj2 => anObj1[key1] === anObj2[key2]
            ),
            ...anObj1
        })
    );
} 
