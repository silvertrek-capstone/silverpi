import ClientInvoices from './client';
import { getInvoices } from '@/api/invoices/getInvoices';
import dayjs from 'dayjs' // Date library

export default async function Invoices() {

    const {data, error} = await getInvoices();
    let invoices = data || [];

    

    async function refreshInvoices() {
        "use server"
        const {data, error} = await getInvoices();
        // Below must be parsed because only simple objects can be passed.
        return JSON.parse(JSON.stringify({data, error}));
    }

    return (
        <ClientInvoices
            invoices={invoices}
            getInvoices={refreshInvoices}
        >

        </ClientInvoices>
    );
}