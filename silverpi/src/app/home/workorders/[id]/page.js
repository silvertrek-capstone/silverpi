import Table from "@/components/table";
import {getSingleWorkOrder} from '@/api/workorders/getSingleWorkOrder'

const headers = [
    {text: 'Scope', value: 'scope'},
    {text: 'Description', value: 'scopeDescription'},
    {text: 'Estimated Hours', value: 'scopeEstimatedHours'},
]


export default async function WorkOrderDetail({ params }) {
    // Initialize state for the dynamic parts of workOrderDetails

    const {data, error} = await getSingleWorkOrder(parseInt(params.id));
    const workOrderDetails = data;
    workOrderDetails.workOrderStatus = workOrderDetails.workOrderStatus ? 'Closed' : 'Open';

    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Work Order #{params.id}</h1>  
            <div>
                <div className="mb-6">
                    <p>
                        <span className="font-semibold">Status: </span>
                        <span style={{ color: workOrderDetails.status === 'Open' ? 'green' : 'inherit' }}>
                            {workOrderDetails.workOrderStatus}
                        </span>
                    </p>
                    <p><span className="font-semibold">Date Created: </span> N/A </p>
                    <p><span className="font-semibold">Description: </span> {workOrderDetails.workOrderDescription}</p>
                    <p><span className="font-semibold">Estimated Hour(s) to Complete: </span> {workOrderDetails.totalEstimatedHours} </p>
                    <p><span className="font-semibold">Hours Worked: </span> N/A </p>    
                </div>
                
                
                <div className='mt-4 mb-8 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg'>
                    <Table
                        headers={headers}
                        items={workOrderDetails.scope}
                    >
                    </Table>
                </div>
            </div>
        </>
    );
}

