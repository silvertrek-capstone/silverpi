import Table from "@/components/table"
import Link from 'next/link';
import { getActiveWorkOrders } from "@/api/workorders/getActiveWorkOrders.js"
import { getWorkCompleted } from "@/api/workorders/getWorkCompleted"
import { getJustWorkorders } from "@/api/workorders/getJustWorkorders"
import { getUnpaidInvoices } from "@/api/invoices/getUnpaidInvoices"
import WorkCompletedBox from "@/components/workCompletedBox"
import ActiveWOBox from "@/components/activeWorkOrdersBox"
import UnpaidInvCard from "@/components/unpaidInvoicesBox"

export default async function Home({ profile }) {

    const {data, error} = await getActiveWorkOrders()
    const wos = data || [];

    const {data: justData, error: justError} = await getJustWorkorders()
    const justWos = justData || [];
    
    // Building list of workorders, needed for grabbing workcompleted workOrderSummary:
    var wosList = []
    justWos.forEach(
        item => {
            wosList.push(item.workOrder)
        }
    )

    const {data: completedData, error: completedError} = await getWorkCompleted(wosList)
    const completeWos = completedData || [];

    const {data: unpaidData, error: invError} = await getUnpaidInvoices()
    const unpaidInvs = unpaidData || []
    
    
    const woHeaders = [
        { text: "ID", value: "workOrder" },
        { text: "Status", value: "wOStatus" },
        { text: "Description", value: "description" }
    ]

    return (
        <div className="">
            <h1 className="text-3xl my-10 text-txt font-bold leading-tight tracking-tight">Hello, Judah!</h1>
            <div className="grid gap-8 sm:grid-cols-2">
                <div className="row-span-2 mb-2">
                    <WorkCompletedBox
                        woCompletedList={completeWos} />
                </div>

                <div className="grid grid-rows-1 grid-flow-col">
                    <div>
                        <ActiveWOBox 
                            woList={wos} />
                        <UnpaidInvCard
                            invList={unpaidInvs} />
                    </div> {/*End of Tables  Workorders*/}
                </div>
            </div>
        </div>
    )
}