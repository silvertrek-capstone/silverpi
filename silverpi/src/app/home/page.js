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
                <div className="mx-auto max-w-2xl text-center position: relative">
                    <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg mb-20">
                        <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                            Agreements</h2>

                        <Link href="/home/agreements">
                            <button type="button"
                                className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                                see more
                            </button>
                        </Link>
                    </div>
                </div> {/*End of Tables  Agreements*/}

                <div className="mx-auto max-w-2xl">
                        <Table
                            headers={woHeaders}
                            items={wos}
                            mainkey="workOrder"
                            link="/home/workorders/"
                        >

                        </Table>
                        <Link href="/home/workorders" className="ma-2 float-right font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                see more
                        </Link>
                </div> {/*End of Tables  Workorders*/}
                <div className="mx-auto max-w-2xl text-center position: relative">
                    <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg mb-20">
                        <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                            Invoices</h2>
                        <Link href="./home/invoices">
                            <button type="button"
                                className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                                see more
                            </button>
                        </Link>
                    </div>
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