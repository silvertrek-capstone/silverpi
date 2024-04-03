import Table from "@/components/table"
import Link from 'next/link';
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getActiveWorkOrders } from "@/api/workorders/getActiveWorkOrders.js"
import { getWorkCompleted } from "@/api/workorders/getWorkCompleted"
import { getJustWorkorders } from "@/api/workorders/getJustWorkorders"
import { getUnpaidInvoices } from "@/api/invoices/getUnpaidInvoices"
import WorkCompletedBox from "@/components/workCompletedBox"
import ActiveWOBox from "@/components/activeWorkOrdersBox"
import UnpaidInvBox from "@/components/unpaidInvoicesBox"

export default async function Home({ }) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: supadata, error: supaerror} = await supabase.auth.getSession()
    const { session } = supadata
    // Check if not signed in. Because all pages are a child component of this one, this should handle security
    if (session === null || supaerror) {
        redirect('/login')
    }

    const profile = await getProfileForUser(supabase, session);
    // Check profile, if no result, log out user, large error occured somewhere
    if (profile === null) {
        redirect('/login')
    }



    const {data, error} = await getActiveWorkOrders()
    const wos = data || [];

    const {data: justData, error: justError} = await getJustWorkorders()
    const justWos = justData || [];
    
    // Building list of workorders, needed for grabbing workcompleted workOrderSummary:
    var wosList = []
    justWos.forEach(
        item => {
            wosList.push(item.workOrder)
        }
    )

    const {data: completedData, error: completedError} = await getWorkCompleted(wosList)
    const completeWos = completedData || [];

    const {data: unpaidData, error: invError} = await getUnpaidInvoices()
    const unpaidInvs = unpaidData || []
    
    
    const woHeaders = [
        { text: "ID", value: "workOrder" },
        { text: "Status", value: "wOStatus" },
        { text: "Description", value: "description" }
    ]

    return (
        <div className="">
            <h1 className="text-3xl my-8 text-txt font-bold leading-tight tracking-tight">Hello, {profile.first_name}!</h1>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div className="row-span-2 self-start">
                    <WorkCompletedBox
                        woCompletedList={completeWos} />
                </div>

                <div className="self-start">
                    <ActiveWOBox 
                        woList={wos} />
                </div>
                <div className="self-end">
                    <UnpaidInvBox
                            invList={unpaidInvs} />
                </div>
            </div>
        </div>
    )
}

async function getProfileForUser(supabase) {
    // Do a select to get profile data for user (name, role, etc)
    // RLS policy should result in just the users data
    const { data } = await supabase.from('profiles').select().single();
    // Above should result in a single row returned
    return data || null;
}