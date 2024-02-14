import ClientWorkOrders from './client';
import {getWorkOrders} from '@/api/workorders/getWorkOrders'
import dayjs from 'dayjs' // Date library

export default async function Workorders() {

    const {data, error} = await getWorkOrders();
    let workorders = data || [];
    workorders = formatWorkOrders(workorders);

    

    async function refreshWorkOrders() {
        "use server"
        const {data, error} = await getWorkOrders();
        // Below must be parsed because only simple objects can be passed.
        return JSON.parse(JSON.stringify({data, error}));
    }

    return (
        <ClientWorkOrders
            workorders={workorders}
            getWorkOrders={refreshWorkOrders}
        >

        </ClientWorkOrders>
    );
}


// Format work orders
function formatWorkOrders(data) {
    const arr = structuredClone(data); // Deep clone of data.
    const statuses = { 0: 'Open', 1: 'Closed'}
    return arr.map((e) => {
        const dt = e.enteredDateTime
        e.enteredDateTime = dayjs(dt).format('MM/DD/YYYY');
        e.status = statuses[e.wOStatus];
        return e;
    });
}