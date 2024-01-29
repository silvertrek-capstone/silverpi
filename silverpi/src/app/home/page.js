import Table from "@/components/table"
import Link from 'next/link';
import { POST as workOrdersPOST } from "@/api/workorders/getActiveWorkOrders.js"

export default async function Home({ profile }) {

    const wos = await getActiveWorkOrders()
    const woHeaders = [
        { text: "ID", value: "workOrder" },
        { text: "Status", value: "wOStatus" },
        { text: "Description", value: "description" }
    ]



    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Hello, Judah!</h1>
            <div className="grid gap-8 grid-cols-2 my-5">
                <div>
        
                </div>

                <div className="grid grid-rows-2 grid-flow-col">
                    <div>
                        <Table
                            headers={woHeaders}
                            items={wos}
                            mainkey="workOrder"
                            link="/home/workorders/"
                            title="Open Work Orders"
                        >

                        </Table>
                        <Link href="/home/workorders" className="py-2 float-right font-semibold leading-6 text-primary hover:text-indigo-500">
                            see more
                        </Link>
                    </div> {/*End of Tables  Workorders*/}
                    <div>
                        <Table
                            headers={woHeaders}
                            items={[]}
                            mainkey="workOrder"
                            link="/home/Invoices/"
                            title="Unpaid Invoices"
                        >

                        </Table>
                        <Link href="/home/Invoices" className="py-2 float-right font-semibold leading-6 text-primary hover:text-indigo-500">
                            see more
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}


async function getActiveWorkOrders() {
    const res = await workOrdersPOST();
    const jsonData = await res.json();
    const { data, error } = jsonData;
    return data || [];
}