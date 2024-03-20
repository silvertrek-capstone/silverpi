import Table from "@/components/table"
import Link from 'next/link';
import { getActiveWorkOrders } from "@/api/workorders/getActiveWorkOrders.js"
import { getWorkCompleted } from "@/api/workorders/getWorkCompleted"
import { getJustWorkorders } from "@/api/workorders/getJustWorkorders"
import WorkCompletedBox from "@/components/workCompletedBox"

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
    
    const woHeaders = [
        { text: "ID", value: "workOrder" },
        { text: "Status", value: "wOStatus" },
        { text: "Description", value: "description" }
    ]

    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Hello, Judah!</h1>
            <div className="grid gap-8 grid-cols-2">
                <div className="row-span-2">
                    <WorkCompletedBox
                        woCompletedList={completeWos} />
                </div>

                <div className="grid grid-rows-2 grid-flow-col mt-1">
                    <div>
                        <Table
                            headers={woHeaders}
                            items={wos}
                            mainkey="workOrder"
                            link="/home/workorders/"
                            title="Open Work Orders"
                        >

                        </Table>
                        <Link href="/home/workorders" className="py-2 float-right font-bold leading-6 text-primary hover:underline">
                            see more
                        </Link>
                    </div> {/*End of Tables  Workorders*/}
                    <div>
                        <Table
                            headers={woHeaders}
                            items={[]}
                            mainkey="workOrder"
                            link="/home/invoices/"
                            title="Unpaid Invoices"
                        >

                        </Table>
                        <Link href="/home/invoices" className="py-2 float-right font-bold leading-6 text-primary hover:underline">
                            see more
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}