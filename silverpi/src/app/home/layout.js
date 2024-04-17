import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Navbar from "@/components/navbar.js"
import { redirect } from 'next/navigation.js'
import { getUserProfile } from '@/api/user/getUserProfile'
import { getRole } from '@/api/admin/getRole'
import { getCustomersForUser } from '@/api/user/getCustomersForUser'

export default async function DashboardLayout({ children }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data, error } = await supabase.auth.getSession()
    const { session } = data
    // Check if not signed in. Because all pages are a child component of this one, this should handle security
    if (session === null || error) {
        console.log(error || 'bad')
        redirect('/login')
    }
    const res1 = await getUserProfile();
    // Check profile, if no result, log out user, large error occured somewhere
    if (res1.error) {
        redirect('/login')
    }
    const profile = res1.data;
    const res2 = await getCustomersForUser();
    // Can't do anything if you don't have any customers, logout.
    if (res2.error || !res2.data?.length) {
        redirect('/login')
    }
    const customers = res2.data;

    // Get the logged in role
    const { data: role_id, error: roleError } = await getRole(); // Always gets logged in users.


    return (
        <>
            <section className='overflow-x-hidden h-full'>
                <Navbar profile={profile} role_id={role_id} customers={customers} />
                <div className='flex'>
                    <div className='flex-1 mx-12 w-full'>
                        {children}
                    </div>
                </div>
            </section>

        </>
    );
}
