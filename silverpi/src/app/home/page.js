import Table from "@/components/table"
import Link from 'next/link';
import { POST as workOrdersPOST } from "@/api/workorders/getActiveWorkOrders.js"

export default async function Home() {

    const wos = await getActiveWorkOrders()
    const woHeaders = [
        { text: "ID", value: "workOrder" },
        { text: "Status", value: "wOStatus" },
        { text: "Description", value: "description" }
    ]



    return (
        <>
            <div class="grid gap-8 grid-cols-2">
                <div>
                <h2>Hello Judah,</h2>

                </div>

                <div class="grid grid-rows-2 grid-flow-col">
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
                    <div className="max-w-2xl">
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
            <div className="mx-20 inline-flex h-full">
                <div className="mx-auto"></div>
                <div className="mx-auto h-full">

                    {/*End of Tables  Invoices*/}

                </div >
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