export default function Home() {
    return (
    <div className="bg-white">
        {/* Dashboard + cust_name */}
        <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Dashboard</h1>
            <h2 className ="mt-10 text-2xl font-bold tracking-tight text-gray-900 "> Customer Name </h2>
            </div>
        </div>  {/*End of Dashboard + cust_name */}

      {/* Tables  */}
      
        <div className="bg-white px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center position: relative">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 position: absolute top: 0px left: 0px">Tablname</h1>
                <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    ID</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Artist</th>
                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Artist</th>
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
                        <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td valign="bottom" align="right">
                                <button id="someButton">
                                A button
                                </button>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

    </div>
    )
  }