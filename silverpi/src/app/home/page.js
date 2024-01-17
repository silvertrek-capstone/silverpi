import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DataTable from "../components/tablegenerator.js"
import Link from 'next/link';
import { gql, GraphQLClient, request } from 'graphql-request'
import { POST as workOrdersPOST} from "@/api/workorders/getWorkOrders.js"
import { POST as workOrdersScopePOST} from "@/api/workorders/getWorkOrderScope.js"
import { POST as workCompletedPOST} from "@/api/workorders/getWorkCompleted.js"
import { POST as agreementsPOST} from "@/api/agreements/getActiveAgreements.js"
import { POST as invoicesPOST} from "@/api/invoices/getUnpaidInvoices.js"

export default async function Home() {
    // loading agreements
    // const agResponse = await agreementsPOST();
    // const agJsonData =  await agResponse.json();
    // const agreements = agJsonData.data;

    // loading workorders
    const woResponse = await workOrdersPOST(1);
    const woJsonData =  await woResponse.json();
    const workorders = woJsonData.data;

    const woResponse2 = await workOrdersScopePOST(1);
    const woJsonData2 =  await woResponse2.json();
    const workordersScope = woJsonData2.data;

    const woResponse3 = await workCompletedPOST(1);
    const woJsonData3 =  await woResponse3.json();
    const workordersCompleted = woJsonData3.data;
    
    // loading invoices
    // const inResponse = await invoicesPOST();
    // const inJsonData =  await inResponse.json()
    // const invoices = inJsonData.data;

    const ids = [1, 2, 3, 4, 5];
    const data2 = ['2023-10-01', '2023-10-05', '2023-10-10', '2023-10-15', '2023-10-20'];
    const data3 = ['blank_desc1', 'blank_desc2', 'blank_desc3', 'blank_desc4', 'blank_desc5'];
    const comp_name = "GENERIC_COMPANY_NAME";
    const cust_name = "GENERIC_CUSTOMER_NAME";
    
    var wOColumns = [
        {
            header: "ID",
            accessor: "workOrder", 
            sortable: true,
            filterable: true
        },
        {
            header: "Status",
            accessor: "wOStatus", 
            sortable: false, 
            filterable: true
        },
        {
            header: "Description",
            accessor: "description", 
            sortable: false,
            filterable: true
        }
    ];

    var wORows = [];
    var allAccessors = wOColumns.map(column => column.accessor);
    var flag = 0; // flag will tell us that we no longer need to store column info
    
    if(workorders["vSMWorkOrder"] != null) {
            workorders["vSMWorkOrder"].forEach(function (value){    // Looping through everything returned in vSMWOrkOrder
                let rowsDict = {};
                for( let key in value) {    // Looping through every key in each object returned. Value will be something like {sMCo, workorder, etc...} and key will be something like just sMCo
                    if(allAccessors.includes(key)) {  // checking if the key is an accessor in the woColumns dictionary 
                      rowsDict[key] = value[key]; 
                    } 
                }
                wORows.push(rowsDict);
        });
        console.log("WOROWS:")
        console.log(wORows);
    }

    return (
    <>
    <DataTable
        columnsInput={wOColumns}
        dataInput={wORows}
        globalFilterEnabled={true}
        routingLocation={"test1/test2"}
        routingEnabled={true}
        routingColumn={"yourItemName_2"}
      />
     {/* <pre>{JSON.stringify(workorders, null, 2)}</pre> */}
     {/* <pre>{JSON.stringify(workordersScope, null, 2)}</pre> */}
     {/* <pre>{JSON.stringify(workordersCompleted, null, 2)}</pre> */}
      {/* Tables  Agreements Work Orders Invoices*/}
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg mb-20">
                    <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                        Agreements</h2>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                <a className="group inline-flex">
                                    ID
                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>

                                    </a>
                                </th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                <a className="group inline-flex">
                                    Date
                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    </a>
                                </th>
                            
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                <a className="group inline-flex">
                                    Description</a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* iterate through data  */}
                          {ids.map((id, index) => ( 
                                <tr key={index}>
                                     <td key={index} className="px-6 py-3.5 text-left font-medium text-gray-900">
                                        <Link href={`/home/agreements/${id}`}>
                                            <div className="hover:underline">
                                                {id}
                                            </div>
                                        </Link>
                                    </td>
                                        <td className="px-3 py-3.5 text-left font-medium text-gray-900">
                                        {data2[index]} </td>
                                        <td className="px-3 py-3.5 text-left font-medium text-gray-900">
                                        {data3[index]} </td>
                                </tr>
                          ))}
               </tbody>
                    </table>
                    <Link href="./home/agreements">
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            see more
                        </button>                
                    </Link>
                </div>
            </div> {/*End of Tables  Agreements*/}

            <div className="mx-auto max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg mb-20">
                    <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                        Workorders</h2>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                <a className="group inline-flex">
                                    ID
                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    </a>
                                </th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                <a className="group inline-flex">
                                    Date
                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    </a>
                                </th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* iterate through data  */}
                          {ids.map((id, index) => ( 
                                <tr key={index}>
                                     <td key={index} className="px-6 py-3.5 text-left font-medium text-gray-900">
                                        <Link href={`/home/workorders/${id}`}>
                                            <div className="hover:underline">
                                                {id}
                                            </div>
                                        </Link>
                                    </td>
                                        <td className="px-3 py-3.5 text-left font-medium text-gray-900">
                                        {data2[index]} </td>
                                        <td className="px-3 py-3.5 text-left font-medium text-gray-900">
                                        {data3[index]} </td>
                                </tr>
                          ))}
               </tbody>
                    </table>
                    <Link href="./home/workorders">
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            see more
                        </button>                
                    </Link>
                </div>
            </div> {/*End of Tables  Workorders*/}
            <div className="mx-auto max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg mb-20">
                    <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                        Invoices</h2>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                <a className="group inline-flex">
                                    ID
                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    </a>
                                </th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                <a className="group inline-flex">
                                    Date
                                    <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    </a>
                                </th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* iterate through data  */}
                          {ids.map((id, index) => ( 
                                <tr key={index} className="hover:bg-gray-100">
                                    <td key={index} className="text-left font-medium text-gray-900">
                                        <Link className="block pl-6 py-3" href={`/home/invoices/${id}`}>
                                            <div>
                                                {id}
                                            </div>
                                        </Link>
                                    </td>
                                    <td className=" text-left font-medium text-gray-900">
                                        <Link className="block py-3" href={`/home/invoices/${id}`}>
                                            {data2[index]}
                                        </Link>
                                    </td>
                                    <td className=" text-left font-medium text-gray-900">
                                        <Link className="block py-3" href={`/home/invoices/${id}`}>
                                            {data3[index]}
                                        </Link>
                                    </td>   
                                </tr>
                          ))}
                        </tbody>
                    </table>
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

            <div>
                <h1 className="margin-block-end: 20px">footer</h1>
            </div>
                            
        </div> {/* End of Tables  Agreements Work Orders Invoices*/}
    </>
    )
  }

// Simulated "database" functions returning data arrays
function databaseIds() {
    return [1, 2, 3, 4, 5]; 
}

function databaseData2() {
    return ['2023-10-01', '2023-10-05', '2023-10-10', '2023-10-15', '2023-10-20'];
}

function databaseData3() {
    return ['blank_desc1', 'blank_desc2', 'blank_desc3', 'blank_desc4', 'blank_desc5']; 
}

function getCompanyName(){ 
    return "GENERIC_COMPANY_NAME"
}

function getCustomer(){
    return "GENERIC_CUSTOMER_NAME"
}