import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// This function will get all agreements, 
export async function POST(customerNum) {


    const query = gql`
    query{
        sMWorkCompleted(where: {
            sMCo: { eq: 1 }
        }){
            keyID
            workOrder	
            status 
            date
            invoice
            agreement
            description
        }
    }`

    const variables = {
        filter: {
        }
    }

    // Make the request
    const {data, error} = await makeQuery(query, variables)
    let status = 200
    if (error) status = 500

    return NextResponse.json({ data, error }, { status: status })
}