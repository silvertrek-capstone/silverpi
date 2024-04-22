import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'
import dayjs from 'dayjs' // Date library

// Returns a nicely formatted single invoice. Takes in an invoice number to acquire said invoice
export async function getSingleInvoice(invNum) {
    try {
        // IMPORTANT, this is how you get the current customer number for the user.
        const { data: customer, error: custerror } = await getCustNum();
        if (custerror) {
            throw new Error(custerror)
        }

        const query = gql`
        query($filter: vrvSMInvoicesByInvoiceNumberFilterInput){
            sMInvoicesByInvoiceNumber(where: $filter){
                invoiceDate
                dueDate
                amount
                taxAmount
                totalAmount
                paidOnInvoice
                paidInFullYN
                sMInvoice{
                    invoice
                    payTerms
                    uniqueAttchID
                    sMInvoiceDetails{
                        invoice
                        invoiceDetail
                        workOrder
                        
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
                sMInvoice: {
                    invoice: { "eq": Number(invNum) }
                },
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return { data, error }
        }

        // If no error, format data a little to get nice response
        const rows = data.sMInvoicesByInvoiceNumber;
        const formatted = formatData(rows[0]);
        return { data: formatted, error };
    } catch (e) {
        console.log(e)
        return { data: null, error: e };
    }
}

// Format
/*
{
    invoice: Int
    statusStr: string
    invoiceDate: string,
    dueDate: string,
    workOrder: int,
    taxAmount: float,
    totalAmount: float,
    paidOnInvoice: float,
    terms: string
    lines: [
        {
            line: string
            description: string
            amount: float
            
        }
    ]
}
*/

// Format the dates, generate the descriptions for the lines.
function formatData(row) {
    const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let obj = {
        

        invoice: row.sMInvoice.invoice,
        terms: row.sMInvoice.payTerms,
        invoiceDate: row.invoiceDate,
        dueDate: row.dueDate,

        unique: row.sMInvoice.uniqueAttchID,

        workOrder: row.workOrder,
        taxAmount: row.taxAmount,
        totalAmount: row.totalAmount,
        paidOnInvoice: row.paidOnInvoice,
        totalPaidString: moneyFormatter.format(row.paidOnInvoice),
        totalAmountString: moneyFormatter.format(row.totalAmount),
        totalDueString: moneyFormatter.format(row.totalAmount - row.paidOnInvoice),
        lines: [],
    };
    obj.invoiceDate = dayjs(row.invoiceDate).format('MM/DD/YYYY');
    obj.dueDate = dayjs(row.dueDate).format('MM/DD/YYYY');

    // calculate status string
    if (obj.paidInFullYN === 'Y') {
        obj.statusStr = 'Paid';
    } else if (dayjs().isAfter(dayjs(obj.dueDate))) { // Else if current date after the date. (Overdue) 1
        obj.statusStr = 'Overdue';
    } else {
        obj.statusStr = 'Unpaid';
    }
    for (let i = 0; i < row.sMInvoice.sMInvoiceDetails.length; i++) {
        const el = row.sMInvoice.sMInvoiceDetails[i];
        // Joined tables
        const { sMWorkCompleted, sMWorkOrderScope, sMInvoiceLines } = el;
        const lineData = sMInvoiceLines[0]; // Should always have one related line.
        const newLine = {
            workOrder: el.workOrder,
            line: el.invoiceDetail,
            amount: lineData.amount,
            amountString: moneyFormatter.format(lineData.amount),
        };

        // Calculate description
        if (lineData.description) {
            newLine.description = lineData.description;
        } else if (sMWorkOrderScope && sMWorkOrderScope.description) {
            newLine.description = sMWorkOrderScope.description;
        } else if (sMWorkCompleted && sMWorkCompleted.description) {
            newLine.description = sMWorkCompleted.description;
        }
        obj.lines.push(newLine);
    }
    return obj;
}

export async function getbHQATAttachments(uniqueID) {
    try {
        // IMPORTANT, this is how you get the current customer number for the user.
        const {data: customer, error: custerror} =  await getCustNum();
        if (custerror) {
            throw new Error(custerror)
        }

        const query = gql`
        query($filter: bHQATFilterInput){
            bHQAT(where: $filter){
                attachmentID
                uniqueAttchID
                origFileName
            }
        }`

        const variables = {
            filter: {
                uniqueAttchID: { "eq": uniqueID}
                
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return {data, error}
        }

        // If no error, format data a little to get nice response
        //const tableRows = data.bHQAT
        //const formatted = ;
        //return {data: tableRows, error};

        const attachments = data.bHQAT;
        console.log(attachments[0])
        return { data: attachments[0], error};
    } catch(e) {
        return {data: null, error: e};
    }
}


export async function getbHQAFAttachments(uniqueID) {
    try {
        // IMPORTANT, this is how you get the current customer number for the user.
        const {data: customer, error: custerror} =  await getCustNum();
        if (custerror) {
            throw new Error(custerror)
        }

        const query = gql`
        query($filter: bHQAFFilterInput){
            bHQAF(where: $filter){
                attachmentData
                attachmentID
                attachmentFileType
            }
        }`

        const variables = {
            filter: {
                    attachmentID: { "eq": Number(uniqueID)}
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            return {data, error}
        }

        // If no error, format data a little to get nice response

        const attachments = data.bHQAF;
        return { data: attachments[0], error};
    } catch(e) {
        return {data: null, error: e};
    }
}
