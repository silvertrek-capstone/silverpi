import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'

export async function getActiveWorkOrders() {
    try {
        // IMPORTANT, this is how you get the current customer number for the user.
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
                    "eq": 1, // Al ways has to equal one
                },
                wOStatus: {
                    "eq": 0
                }
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return {data, error}
        }

        // If no error, format data a little to get nice response
        const tableRows = data.vSMWorkOrder
        return {data: tableRows, error};
    } catch(e) {
        return {data: null, error: e};
    }
}