import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import "dotenv/config"


// TODO: Implement pagination, listUsers defaults to 50 users.
// IMPORTANT: Not going to scale super well, should be fine until a few thousand users i'd guess
// https://supabase.com/docs/reference/javascript/auth-admin-listusers
export async function POST(request, sParams) {
    try {
        // TODO: Implement auth here so we don't get screwed by the stuff we do below.

        const {SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SUPABASE_URL} = process.env
        // Have to create it this way to work as a service_role send
        const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)

        // Get all user ids with at least one customer number
        const {data: custData, error: custError} = await supabase
            .from('customer_to_user')
            .select('user_id');
        if (custError) {
            throw new Error(custError)
        }
        const customers = custData.map((e) => {
            return e.user_id
        })

        // Now we have all the users that have correlated customers
        // Get all users
        // TODO: THIS NEEDS TO PAGINATE, DEFAULT 50 RESULTS
        const {data: usersData, error: usersError} = await supabase.auth.admin.listUsers()
        if (usersError) {
            throw new Error(usersError)
        }

        // Filter out users that don't have customer numbers
        let users = usersData.users
        users = users.filter((user) => {
            return customers.includes(user.id)
        })

        return NextResponse.json({ data: users, error: null }, { status: 200 })
    } catch(error) {
        return NextResponse.json({ data: null, error }, { status: 500 })

    }


}

// Called in server components
export async function handler(params) {
    return POST(null, params)
}

// Helper functions