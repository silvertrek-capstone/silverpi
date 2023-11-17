import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import "dotenv/config"

export async function POST(request) {

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore }, { supabaseKey: process.env.SUPABASE_SERVICE_KEY })
    try {
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            throw new Error(error);
        }

        console.log(data)
        const users = data.users;

        // SQL Query here from auth signup
        // Return new array we created after filtering
        // Filter the users array by the customer to users array
        // Change Select . doesnt need JS if wanted

        const { data: sqlTab, error: sqlErr } = await supabase.from('customer_to_user').select()

        if (sqlErr) {
        console.log(sqlErr)
        } else {    
        console.log(sqlTab)
        }

        const filteredUsers = users.filter(user => 
            !sqlTab.some(customer => customer.user_id === user.id)
        );

        return NextResponse.json({ data: filteredUsers, error }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ data: null, error }, { status: 500 })
    }
}
