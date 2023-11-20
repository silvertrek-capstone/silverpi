"use client"
import React from "react";
import 'regenerator-runtime/runtime'; 
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

/*
    Notes: How to use table_gen
        items: An array of objects, the keys in the objects will match “value” in the given headers. Each object represents a row in the table
        headers: An array of objects, each object representing the header of a column in the table. Each object should contain the following:
        text: The name of the header (what the user sees)
        value: the key to match in the object
        sortable: whether or not the column should be sortable
        disable-search; a boolean value that turns off the search bars for each column, smaller tables will not need search.
*/


/*
    Notes: things need to be done 
    - need to make search function disappear if table is smaller than a number of rows
    - just general stylizing 
    - option to show how many rows to appear in general if need be
    - option to change how many rows to return when searching 
*/

/*
    Notes: troubleshooting stuff will remove this after resolved same with many comments in this file
    Remade the table step by step and pointing out potentially where the prop 
    spreading issue is detected I might keep a normal react-table without all the 
    effort to remove the props from the things such as <th> 

    import 'regenerator-runtime/runtime'; was needed for asyncdebounce there are other 
    solutions i do not know which is preferable deal with later 

    going to add comments to make getting help for debugging easier if needed later
    for potential changes 

    two issues mainly warnings about 
    - props being spread
    - key attributes being numbers 
    - pass in name of table so that global search has it in the name?
*/


// Define a default UI for filtering
// start of functions for table filtering
function GlobalFilter({preGlobalFilteredRows,globalFilter,setGlobalFilter, }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    
    // debounce time is 200ms
    // if empty undefined else user input in filter
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
  
    // return filter box and set val 
    return (
        <div className="flex justify-end">
        <div className="relative">
            <input
                name="globalsearchInput"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search table records...`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
            </div>
        </div>
        </div>
    ); 
  }
  

/*
    Note: I dont use debounce here and it is not needed 
    in for the Global filter its just helpful to not make so         
    many changesif expecting long input values 
*/ 
  function DefaultColumnFilter({column: { filterValue, preFilteredRows, setFilter },}) {
    const count = preFilteredRows.length
    // return filter box for a column 
    return (
        <div className="relative">
                <input
                    name="defsearchInput"
                    className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                    value={filterValue || ''}
                    onChange={e => {
                        setFilter(e.target.value || undefined)
                    }}
                    placeholder={`Search ${count} records...`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </div>
        ); 
  } 
// end of functions for table filtering
// ====================================

const DataTable = ({ columnsInput, dataInput }) => {

    // For sorting/filtering things need to be memoized
    const data = React.useMemo(() => dataInput, [dataInput]);
    const columns = React.useMemo(() => columnsInput, [columnsInput]);
    const defaultColumn = React.useMemo(() => ({Filter: DefaultColumnFilter,}),[]); 
    const rowTotalCount = data.length;
    const minRowCount = 5; 
    const tableName = "SampleTable";

  // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        } = useTable(
        {
        columns,
        data,
        defaultColumn
        },
        useFilters, 
        useGlobalFilter,
        useSortBy
    );

    return (
        <div className="bg-white ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg height:100% position:absolute py-8
        ">
        <div className=" position: absolute bottom: 0px">
          <h1 className="mx-7 text-xl font-semibold leading-6 text-gray-900">{tableName}</h1>
        </div>
        <div className="mx-5">
            {rowTotalCount > minRowCount ? (
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}/>) :
                null}
        </div>
        {/*props spreading  */}
          <table className="min-w-full min-h-full divide-gray-300"
                {...getTableProps()}>
            <thead>
                {/* Note MAPPING JSX: if any value in your mapped thing is a number then 
                it will be seen as a key which will raise a warning as JSX wants a string 
                key = {JSON.stringify(headerGroup.values)} will play around with this later*/}
                {headerGroups.map((headerGroup, index_headergroup) => (
                //  prop spreading
                <tr key = {index_headergroup} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index_column) => (
                    
                    //  prop spreading *check bug hello company dropdown not going over my hover headers 
                    <th 
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300
                         bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold
                         text-gray-900 backdrop-blur backdrop-filter sm:table-cell"

                        key = {index_column} {...column.getHeaderProps(column.sortable ?column.getSortByToggleProps(): "")}
                    >
                    <div className="group inline-flex items-center space-x-2">
                        {/* header */}
                        <div className="mt-5">
                            {column.render("Header")} 
                        </div>
                        {/* filtering box */}
                        {column.filterable && (rowTotalCount > minRowCount) ? (
                            <div className="relative">
                                <br/>
                                {column.canFilter ? column.render('Filter') : null}
                            </div>
                        ): null}
                                
                        {/* arrows for sorting */}

                        {column.sortable && (
                            <div className="ml-2 flex-none">
                                {column.isSorted ? 
                                    (column.isSortedDesc ? 
                                        <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>: 
                                        (<span className=" ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                            <ChevronDownIcon className="h-5 w-5 rotate-180" aria-hidden="true" />
                                        </span>) ): 
                                         (<span className=" ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                                            <ChevronUpDownIcon className="h-5 w-5 " aria-hidden="true" />
                                        </span>)
                                }
                            </div>
                        )}
                    </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead> 
            {/* //  prop spreading */}
            <tbody className="divide-y divide-gray-200 bg-white"
                {...getTableBodyProps()}>
              {rows.map((row, index_row) => {
                prepareRow(row);
                return (
                    //  prop spreading
                    <tr key = {index_row} {...row.getRowProps()} >
                        {row.cells.map((cell, index_cell) => {
                            return (
                                //  prop spreading
                                <td className="px-6 py-3.5 text-left font-medium text-gray-900" 
                                key = {index_cell} {...cell.getCellProps()}>{cell.render("Cell")} </td>
                        );
                    })} 
                  </tr>
                );
              })}
            </tbody>
            </table>
              <br />
                <div 
                    className="px-6 py-3.5 text-left font-medium text-gray-900">
                    Showing the first 20 results of {rows.length} rows
                </div>
          </div>
    );
};

export default DataTable;