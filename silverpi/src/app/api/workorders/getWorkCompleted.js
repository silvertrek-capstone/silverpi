import { NextResponse } from 'next/server'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'

// This function will get all work order completed's of a given list of workorders
// Must pass the list of workorders as a parameter into the function.
export async function getWorkCompleted(wosList) {
    try {
        // There is no filter object in the schema for the workcompleted table, so you must do everything within the actual query itself
        const query = gql`
        query($workOrdersList: [Int!]){
            sMWorkCompleted(
                where: {
                    sMCo: { eq: 1 }
                    workOrder: { in: $workOrdersList }
                }
                order: { 
                    date: DESC 
                }
            ){
                keyID
                technician
                workOrder	
                status 
                date
                invoice
                agreement
                description
            }
        }`

        const variables = {
            workOrdersList: wosList
        }

        // Make the request
        const {data, error} = await makeQuery(query, variables)
        if (error) {
            return {data, error};
        }

        // If no error, format the data a bit to return just the rows
        const tableRows = data.sMWorkCompleted;
        return {data: tableRows, error};
    } catch(e) {
        return {data: null, error: e};
    }
}
