import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Navbar from "../components/navbar.js"
import { redirect } from 'next/navigation.js'

export default async function DashboardLayout({ children }) {
    console.log('test')
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data, error } = await supabase.auth.getSession()
    const { session } = data
    // Check if not signed in. Because all pages are a child component of this one, this should handle security
    if (session === null || error) {
        redirect('/login')
    }

    return (
        <>
            <Navbar />
            <section>{children}</section>

        </>
    );
}