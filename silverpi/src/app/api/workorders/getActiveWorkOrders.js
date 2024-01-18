import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'

// This function will get all agreements, 
export async function POST() {
    try {
        const {data: customer, error: custerror} =  await getCustNum();
        if (custerror) {
            throw new Error(custerror)
        }

        const query = gql`
        query($filter: vSMWorkOrderFilterInput){
            vSMWorkOrder(where: $filter){
                sMCo
                workOrder
                custGroup
                customer
                description
                notes
                wOStatus
            }
        }`

        const variables = {
            filter: {
                customer: { "eq": customer }, // Customer number
                custGroup: {
                    "eq": 1, // Always has to equal one
                },
                wOStatus: {
                    "eq": 0
                }
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return NextResponse.json({ data, error }, { status: 500 })
        }

        // If no error, format data a little to get nice response
        const tableRows = data.vSMWorkOrder

        return NextResponse.json({ data: tableRows, error }, { status: 200 })
    } catch(e) {
        return NextResponse.json({ data: null, error: e }, { status: 500 })
    }

}