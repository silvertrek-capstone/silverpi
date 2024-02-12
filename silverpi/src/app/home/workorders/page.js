import ClientWorkOrders from './client';
import {getWorkOrders} from '@/api/workorders/getWorkOrders'

export default async function Workorders() {

    const {data, error} = await getWorkOrders();
    const workorders = data || [];
    

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
