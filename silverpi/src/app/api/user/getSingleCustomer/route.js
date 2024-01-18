import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// Takes a given customer number, and returns all the basic data on it
// (ONLY RETURNS ONE CUSTOMER)
export async function handler(params) {
    // Get the sent data (jsonData)
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
                "eq": params.id
            },
            custGroup: {
                "eq": 1, // Always has to equal one
            }
        }
    }

    // Make the request
    const { data, error } = await makeQuery(query, variables)
    if (error) {
        return NextResponse.json({ data, error }, { status: 500 })
    }

    // If no error, format data a little to get a nice response
    const tableRows = data.bARCM // Table name
    const firstRow = tableRows[0] // Only want one result

    return NextResponse.json({ data: firstRow, error }, { status: 200 })
}