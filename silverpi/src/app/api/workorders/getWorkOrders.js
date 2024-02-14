import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'

export async function getWorkOrders() {
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
                enteredDateTime
                customer
                description
                notes
                wOStatus
            }
        }`
    
        const variables = {
            filter: {
                customer: { "eq": customer },
                custGroup: {
                    "eq": 1, // Always has to equal one
                }
            }
        }
    
        // Make the request
        const {data, error} = await makeQuery(query, variables)
        if (error) {
            return {data, error};
        }
        // If no error, format the data a bit to return just the rows
        const tableRows = data.vSMWorkOrder;
        return {data: tableRows, error};

    } catch(e) {
        console.log(e)
        return {data: null, error: e};
    }
}