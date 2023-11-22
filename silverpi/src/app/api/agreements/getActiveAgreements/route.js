import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

export async function POST(request){
    const query = gql`
    query ($filter: vSMAgreementAmrtBatchFilterInput){
        vSMAgreementAmrtBatch(where: $filter) {
            sMAgreementAmrtBatchID
            service
            agreement
        }
    }`


    const variables = {
        filter: {
            sMAgreementAmrtBatchID: {
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