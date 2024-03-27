import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'
import { getCustNum } from '@/helpers/usingCustomer'
import dayjs from 'dayjs' // Date library


// This function gets all invoices.
export async function getInvoices() {
    try {
        // IMPORTANT, this is how you get the current customer number for the user.
        const {data: customer, error: custerror} =  await getCustNum();
        if (custerror) {
            throw new Error(custerror)
        }

        const query = gql`
        query($filter: vrvSMInvoicesByInvoiceNumberFilterInput){
            sMInvoicesByInvoiceNumber(where: $filter){
                sMCo
                invoice
                invoiceDate
                dueDate
                amount
                taxAmount
                totalAmount
                paidOnInvoice
                paidInFullYN
                workOrder
                sMInvoice{
                    sMCo
                    invoice
                    payTerms
                    sMInvoiceDetails{
                        sMCo
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
                customer: { "eq": customer }
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            throw new Error(error);
        }

        // If no error, format data a little to get nice response
        const tableRows = data.sMInvoicesByInvoiceNumber;
        console.log(tableRows[0]);
        console.log(tableRows[1]);
        const formatted = formatData(tableRows);
        const wos = formatted.map((e) => e.workOrder).filter((e) => e);
        const workOrders = await getCorrelatedWorkOrders(wos, customer).catch((e) => {throw e});
        const joined = leftJoin(formatted, workOrders, 'workOrder', 'workOrder');
        return {data: joined, error};
    } catch(e) {
        return {data: null, error: e};
    }
}

// Formats dates, also sets the status
// 0: unpaid, 1: overdue, 2: paid.
function formatData(rows) {
    const arr = [];
    const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        row = {
            ...row,
            invoice: row.sMInvoice.invoice,
            invoiceDate: dayjs(row.invoiceDate).format('MM/DD/YYYY'),
            dueDate: dayjs(row.dueDate).format('MM/DD/YYYY'),
            totalAmountString: moneyFormatter.format(row.totalAmount),
        }
        // Calculate status.
        // If paid, status 2
        if (row.paidInFullYN === 'Y') {
            row.status = 2
            row.statusStr = 'Paid'
        } else if (dayjs().isAfter(dayjs(row.dueDate))) { // Else if current date after the date. (Overdue) 1
            row.status = 1;
            row.statusStr = 'Overdue'
        } else {
            row.status = 0;
            row.statusStr = 'Unpaid'
        }
        arr.push(row);
    }
    return arr;
}

// To get description, we use the work order description, so get all the workorders that are related to the invoices
async function getCorrelatedWorkOrders(wos, custNum) {

    const query = gql`
    query($filter: vSMWorkOrderFilterInput){
        vSMWorkOrder(where: $filter){
            workOrder
            description
        }
    }`

    const variables = {
        filter: {
            customer: { "eq": custNum },
            sMCo: { "eq": 1 },
            custGroup: {
                "eq": 1, // Always has to equal one
            },
            workOrder: { "in": wos}
        }
    };

    // Make the request
    const {data, error} = await makeQuery(query, variables)
    if (error) {
        throw new Error(error)
    }
    return data.vSMWorkOrder;
}

function leftJoin(objArr1, objArr2, key1, key2) {
    return objArr1.map(
        anObj1 => ({
            ...objArr2.find(
                anObj2 => anObj1[key1] === anObj2[key2]
            ),
            ...anObj1
        })
    );
} 