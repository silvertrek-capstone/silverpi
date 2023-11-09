import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

export async function POST(request) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const session = supabase.auth.getSession();
    if (!session) { // Unauthenticated
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 500 })
    }

    const query = gql`
    query($filter: bARCMFilterInput){
        bARCM(where: $filter){
            custGroup
            customer
            name
            phone
            fax
            eMail
            address
            city
            state
            zip
        }
    }`

    const variables = {
        filter: {
            customer: {
                "eq": 1
            }
        }
    }

    // Make the request
    const {data, error} = await makeQuery(query, variables)
    let status = 200
    if (error) status = 500

    return NextResponse.json({ data, error }, { status: 200 })
}