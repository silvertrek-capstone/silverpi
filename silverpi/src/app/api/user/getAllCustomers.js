import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// Takes in an array of ids (customer numbers) and returns all the information related to them
export async function getAllCustomers() {
    try {
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
                custGroup: {
                    "eq": 1, // Always has to equal one
                }
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            throw new Error(error)
        }

        // If no error, format data a little to get a nice response
        const tableRows = data.bARCM // Table name
        return {data: tableRows, error: false};

    } catch (e) {
        return { data: null, error: e.toString() }
    }
}