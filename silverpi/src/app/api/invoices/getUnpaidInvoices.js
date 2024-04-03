import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'

export async function getUnpaidInvoices() {
    try {
        // IMPORTANT, this is how you get the current customer number for the user.
        const {data: customer, error: custerror} =  await getCustNum();
        if (custerror) {
            throw new Error(custerror)
        }

        const query = gql`
        query($filter: vrvSMInvoicesByInvoiceNumberFilterInput){
            sMInvoicesByInvoiceNumber
            (   
                where: $filter
                order: { 
                    dueDate: DESC 
                }
            ){
                sMCo
                invoice
                status
                statusDescription
                invoiceDate
                dueDate
                amount
                taxAmount
                totalAmount
                paidOnInvoice
                paidInFullYN
                sMInvoice{
                    invoice
                    invoiceNumber
                    sMInvoiceDetails{
                        sMCo
                        invoice
                        invoice
                        invoiceDetail
                        workOrder
                        scope
                        workCompleted
                        
                        sMWorkCompleted {
                            workCompleted
                            description
                            priceRate
                            priceTotal
                        }
        
                        sMWorkOrderScope {
                            workScope
                            description
                        }
        
                        sMInvoiceLines{
                            description
                            taxAmount
                            amount
                        }
                    }
                }
            }
        }`

        const variables = {
            filter: {
                sMCo: { "eq": 1 },
                customer: { "eq": customer }, // Customer number
                paidInFullYN: { "neq": "Y"},
                
            }
            
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return {data, error}
        }

        // If no error, format data a little to get nice response
        const tableRows = data.sMInvoicesByInvoiceNumber;
        const formatted = formatData(tableRows)
        return {data: formatted, error};
    } catch(e) {
        return {data: null, error: e};
    }
}

function formatData(rows) {
    const arr = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const obj = {
            invoice: row.sMInvoice.invoice,
            dueDate: row.dueDate.slice(0, row.dueDate.indexOf('T')),
            amount: row.totalAmount,
            workorders: [],
        };
        const details = row.sMInvoice.sMInvoiceDetails;
        for (let j = 0; j < details.length; j++) {
            const detail = details[j];
            if(obj.workorders.includes(detail.workOrder) === false) {
                obj.workorders.push(detail.workOrder)
            }
        }
        arr.push(obj)
    }
    return arr
}