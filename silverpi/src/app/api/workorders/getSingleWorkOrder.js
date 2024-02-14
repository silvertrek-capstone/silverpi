import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// Get a single work order, in the following format:
/*
 {
    workOrder: Number,
    workOrderStatus: Number,
    workOrderDescription: String
    scope: [
        {
            scope: Number
            scopeDescription: String,
            scopeEstimatedHours: Float,
            scopeEstimatedPrice: Float,
        }
    ]
    totalEstimatedHours: Float
 }

*/

export async function getSingleWorkOrder(workOrder) {
    try {
        if (!workOrder) {
            throw new Error('Param "workOrder" should have a value');
        }
        const query = gql`
        query($filter: WorkOrderSummaryFilterInput){
            workOrderSummary(where: $filter){
                sMCo
                workOrder
                workOrderDescription
                workOrderStatus
                scope
                scopeDescription
                scopeEstimatedHours
                scopeEstimatedPrice
                readyToBill
                previouslyBilled
                billableRemaining
            }
        }`

        const variables = {
            filter: {
                sMCo: { "eq": 1 }, // Silvertreks customers.
                workOrder: { "eq": workOrder }, // The given work order
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return { data, error }
        }

        // If no error, format data a little to get nice response
        const tableRows = data.workOrderSummary
        const formattedWorkOrder = formatData(tableRows);
        return { data: formattedWorkOrder, error };
    } catch (e) {
        return { data: null, error: e };
    }
}

// The workorder summary table returns duplicate rows for each scope item for a work order, so we need to format into a good object
// See top of file for what the result of this should be
function formatData(data) {

    const obj = {
        workOrder: null,
        workOrderStatus: null,
        workOrderDescription: null,
        totalEstimatedHours: 0,
        scope: [],
    };
    // Loop over data, and set the fields
    for (let i = 0; i < data.length; i++) {
        const el = data[i];
        if (i === 0) { // Set the work order data to the result of the first row.
            obj.workOrder = el.workOrder;
            obj.workOrderStatus = el.workOrderStatus;
            obj.workOrderDescription = el.workOrderDescription;
        }
        // Create a scope row
        const scopeRow = {
            scope: el.scope,
            scopeDescription: el.scopeDescription,
            scopeEstimatedHours: el.scopeEstimatedHours,
            scopeEstimatedPrice: el.scopeEstimatedPrice,
        };
        // Push the scope row to the scope array
        obj.scope.push(scopeRow);

        // Add the estimated hours to the total estimate
        obj.totalEstimatedHours += el.scopeEstimatedHours;
    }
    return obj; // Return the now filled object.
}