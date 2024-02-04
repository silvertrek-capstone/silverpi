import Table from "@/app/components/table";

const workOrderDetails = {
    status: 'Open',
    dateCreated: '12/12/2023',
    orderDescription: 'Fixed issue with blank lines in export',
    estimationToComplete: '40 hours',
    hoursWorked: '20 hours',
    tableFields: [
        {
            description: 'Silvertrek Admin created Work Order #135',
            date: '12/12/2023'
        },
        {
            description: 'Silvertrek Admin added 6 hours worked.',
            date: '12/13/2023'
        },
        {
            description: 'Silvertrek Admin edited hours worked.',
            date: '12/13/2023'
        },
        {
            description: 'Silvertrek Admin added 12 hours worked.',
            date: '12/15/2023'
        },
        {
            description: 'Silvertrek Admin created Invoice #516584',
            date: '12/15/2023'
        },
    ]
}



const headers = [
    {text: 'Description', value: 'description'},
    {text: 'Date', value: 'date'},
]

export default function WorkOrderDetail({ params }) {

    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Work Order #{params.id}</h1>  
            <div>
                <div className="mb-6">
                    <p>
                        <span className="font-semibold">Status: </span>
                        <span style={{ color: workOrderDetails.status === 'Open' ? 'green' : 'inherit' }}>
                            {workOrderDetails.status}
                        </span>
                    </p>
                    <p><span className="font-semibold">Date Created: </span> {workOrderDetails.dateCreated}</p>
                    <p><span className="font-semibold">Description: </span> {workOrderDetails.orderDescription}</p>
                    <p><span className="font-semibold">Estimated Hour(s) to Complete: </span> {workOrderDetails.estimationToComplete} </p>
                    <p><span className="font-semibold">Hours Worked: </span> {workOrderDetails.hoursWorked} </p>    
                </div>
                <div className="flex justify-end space-x-4 mb-12">
                    <button
                        type="button"
                        className="rounded bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        View Work Order in PDF
                    </button>
                    <button
                        type="button"
                        className="rounded bg-indigo-500 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        View Invoice
                    </button>
                </div>
                
                <div className="mb-6 overflow-x-auto">
                    <Table
                        headers={headers}
                        items={workOrderDetails.tableFields}
                    >
                    </Table>
                </div>
            </div>
        </>
    );
}