import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// Takes in an array of ids (customer numbers) and returns all the information related to them
export async function handler(ids) {
    const query = gql`
    query($filter: bARCMFilterInput){
        bARCM(where: $filter){
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
                "in": ids // Acts as a WHERE IN in sql, returns all customer numbers that are in the ids array
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

    return NextResponse.json({ data: tableRows, error }, { status: 200 })
}