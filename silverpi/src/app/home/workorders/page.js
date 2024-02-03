import ClientWorkOrders from './client';
import {getWorkOrders} from '@/api/workorders/getWorkOrders'

export default async function Workorders() {

    console.log('initial');
    const {data, error} = await getWorkOrders(null);
    const workorders = data || [];
    
    async function getWorkOrdersAction(status) {
        "use server"
        const {data, error} = await getWorkOrders(status);
        return JSON.parse(JSON.stringify({data, error}));
    }

    return (
        <ClientWorkOrders
            workorders={workorders}
            getWorkOrders={getWorkOrdersAction}
        >

        </ClientWorkOrders>
    );
}
