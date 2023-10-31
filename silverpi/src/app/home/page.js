export default function Home() {
    return (
    <div className="bg-grey">
        {/* Dashboard + cust_name */}
        <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Dashboard</h1>
            <h2 className ="mt-10 text-2xl font-bold tracking-tight text-gray-900 "> Customer Name </h2>
            </div>
        </div>  {/*End of Dashboard + cust_name */}

      {/* Tables  Agreements Work Orders Invoices*/}
      
        <div className="bg-grey px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
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
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                        </tbody>
                    </table>
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            Button text
                        </button>
                </div>
            </div>

            <div className="mx-auto mt-20 max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                    <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                        Work Orders</h2>
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
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                        </tbody>
                    </table>
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            Button text
                        </button>
                </div>
            </div>

            <div className="mx-auto mt-20 max-w-2xl text-center position: relative">
                <div className="bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
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
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                            <tr>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>
                                <td className="px-3 py-3.5 text-left font-medium text-gray-900">example </td>

                            </tr>
                        </tbody>
                    </table>
                         <button type="button"
                            className="mt-2 position absolute right-0 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-indigo-600">
                            Button text
                        </button>
                </div>
            </div>

            
        </div>

    </div>
    )
  }