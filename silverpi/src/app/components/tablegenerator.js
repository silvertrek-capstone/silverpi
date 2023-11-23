"use client"
import React from "react";
import 'regenerator-runtime/runtime'; 
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

/*
    How to use tablegenerator:  
    DataTable takes in 4 props columnsInput, dataInput, tableNameInput, globalFilterEnabled
    and disables search if less than 5 rows are passed in

    globalFilterEnabled: Enables global search, pass in globalFilterEnabled: true/false 
    tableNameInput: Pass in a string that you want your table name to be, if no string provided, table will not have a name 
    dataInput: sortable enables sort on the column and filterable enables search on the column
        const columns = [
            {
                Header: 'yourColumnName',
                accessor: 'yourItemName',
                sortable: true or false, 
                filterable: true or false, 
            }, 
        ]
    dataInput: the item will go in the right column which it know based on the accessor 
        const data = [
            { yourItemName_1: "1-2-2023", yourItemName_2: "john", yourItemName_3: "cashier" }, 
        ]

    Example how to call it in a page.js
    <DataTable columnsInput={columns} dataInput={data} globalFilterEnabled = {true}/>
       
*/

/*
    Notes:
    import 'regenerator-runtime/runtime'; was needed for asyncdebounce there are other 
    solutions i do not know which is preferable deal with later 
*/
function GlobalFilter({preGlobalFilteredRows,globalFilter,setGlobalFilter}) {
    const count = preGlobalFilteredRows.length; 
    const [value, setValue] = React.useState(globalFilter); 
    
    // debounce time is 200ms
    // if empty undefined else user input in filter
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
  
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
                placeholder={`Search ${count} records...`}
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
  function ColumnFilter({column: { filterValue, preFilteredRows, setFilter }}) {
    const count = preFilteredRows.length; 
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

const DataTable = ({ columnsInput, dataInput, tableNameInput, globalFilterEnabled }) => {

    // For sorting/filtering things need to be memoized
    const data = React.useMemo(() => dataInput, [dataInput]);
    const columns = React.useMemo(() => columnsInput, [columnsInput]);
    const defaultColumn = React.useMemo(() => ({Filter: ColumnFilter,}),[]); 
    const rowTotalCount = data.length;
    const minRowCount = 5; 
    const tableName = tableNameInput;
    const globalfilterEnabled = globalFilterEnabled; 

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
        <div className="bg-white ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg height:100% position:absolute py-8">
        <div className=" position: absolute bottom: 0px">
          <h1 className="mx-7 text-xl font-semibold leading-6 text-gray-900">{tableName}</h1>
        </div>
        <div className="mx-5">
            {globalfilterEnabled && (rowTotalCount > minRowCount ? 
                (<GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />)
                : null)} 
        </div>
            <table className="min-w-full min-h-full divide-gray-300"
                {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...keyRemovedHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...keyRemovedHeaderGroupProps}>
                            {headerGroup.headers.map((column) => {
                                const { key, ...keyRemovedColumnProps } = column.getHeaderProps(column.sortable ? column.getSortByToggleProps(): "");
                                return (
                                    <th 
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300
                                    bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold
                                    text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                    key = {key} {...keyRemovedColumnProps}
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
                                );
                            })}
                            </tr>
                        );
                    })}
                </thead> 
                <tbody className="divide-y divide-gray-200 bg-white"
                    {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        const { key, ...keyRemovedRowProps } = row.getRowProps();
                        return (
                            <tr key={key} {...keyRemovedRowProps}>
                            {row.cells.map((cell) => {
                                const { key, ...keyRemovedCellProps } = cell.getCellProps();
                                return (
                                    <td className="px-6 py-3.5 text-left font-medium text-gray-900" 
                                    key = {key} {...keyRemovedCellProps}>{cell.render("Cell")} </td>
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
                    Showing {rows.length} of {rowTotalCount} rows
                </div>
        </div>
    );
};

export default DataTable;