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

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl my-10">
                    <Table
                        headers={woHeaders}
                        items={[]}
                        mainkey="id"
                        link="/home/agreements/"
                        title="Active Agreements"
                    ></Table>
                    <Link href="/home/agreements" className="py-2 float-right font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        see more
                    </Link>
                </div> {/*End of Tables  Agreements*/}

                <div className="mx-auto max-w-2xl">
                    <Table
                        headers={woHeaders}
                        items={wos}
                        mainkey="workOrder"
                        link="/home/workorders/"
                        title="Open Work Orders"
                    >

                    </Table>
                    <Link href="/home/workorders" className="py-2 float-right font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        see more
                    </Link>
                </div> {/*End of Tables  Workorders*/}
                <div className="mx-auto max-w-2xl mt-10">
                    <Table
                        headers={woHeaders}
                        items={[]}
                        mainkey="workOrder"
                        link="/home/Invoices/"
                        title="Unpaid Invoices"
                    >

                    </Table>
                    <Link href="/home/Invoices" className="py-2 float-right font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        see more
                    </Link>
                </div>
                {/*End of Tables  Invoices*/}

            </div > {/* End of Tables  Agreements Work Orders Invoices*/}
        </>
    )
}


async function getActiveWorkOrders() {
    const res = await workOrdersPOST();
    const jsonData = await res.json();
    const { data, error } = jsonData;
    return data || [];
}