import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// This function will get all agreements, 
export async function POST(customerNum) {


    const query = gql`
    query($filter: vSMWorkOrderFilterInput){
        vSMWorkOrder(where: $filter){
            sMCo
            workOrder
            description
            wOStatus
        }
    }`

    const variables = {
        filter: {
            wOStatus: {
                "eq": 1
            },
            customer: {
                "eq": customerNum
            }
        }
    }

    // Make the request
    const {data, error} = await makeQuery(query, variables)
    let status = 200
    if (error) status = 500

    return NextResponse.json({ data, error }, { status: status })
}