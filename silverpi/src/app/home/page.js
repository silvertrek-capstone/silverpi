'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function Home() {

//  sim getting data for user comp name and user name 
    const [comp_name, setcomp] = useState('');
    const [cust_name, setcust] = useState('');

    useEffect(() => {
        const comp_name = getCompanyName()
        const cust_name = getCustomer()  
        setcomp(comp_name) 
        setcust(cust_name)     
      }, []); 

//  sim getting data for tables 
    const [ids, setIds] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    useEffect(() => {
        // Simulate fetching data from db 
        const idData = databaseIds(); 
        const data2Data = databaseData2();
        const data3Data = databaseData3();

        // Update state of fetched data
        setIds(idData);
        setData2(data2Data);
        setData3(data3Data);
    }, []);


    return (
    <div className="bg-grey">
        {/* Dashboard + cust_name */}
        <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Dashboard</h1>
            <h2 className ="mt-10 text-2xl font-bold tracking-tight text-gray-900 "> {cust_name} </h2>
            </div>
        </div>  {/*End of Dashboard + cust_name */}

      {/* Tables  Agreements Work Orders Invoices*/}
      
        <div className="bg-grey px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg mb-20">
                    <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                        Agreements</h2>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    ID</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Date</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* iterate through data  */}
                          {ids.map((id, index) => ( 
                                <tr key={index}>
                                     <td key={index} className="px-6 py-3.5 text-left font-medium text-gray-900">
                                        <Link href={`/home/Agreements/${id}`}>
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
                    <Link href="./home/Agreements">
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            Button text
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
                                    ID</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Date</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* iterate through data  */}
                          {ids.map((id, index) => ( 
                                <tr key={index}>
                                     <td key={index} className="px-6 py-3.5 text-left font-medium text-gray-900">
                                        <Link href={`/home/Workorders/${id}`}>
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
                    <Link href="./home/Workorders">
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            Button text
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
                                    ID</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Date</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* iterate through data  */}
                          {ids.map((id, index) => ( 
                                <tr key={index}>
                                     <td key={index} className="px-6 py-3.5 text-left font-medium text-gray-900">
                                        <Link href={`/home/Invoices/${id}`}>
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
                    <Link href="./home/Invoices">
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            Button text
                        </button>                
                    </Link>
                </div>
            </div> 
            {/*End of Tables  Invoices*/}

            <div>
                <h1 className="margin-block-end: 20px">footer</h1>
            </div>

        </div> {/* End of Tables  Agreements Work Orders Invoices*/}
    </div>
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