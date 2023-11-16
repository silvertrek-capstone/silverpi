"use client"
import React from "react";
import 'regenerator-runtime/runtime';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// Notes: sorting and filtering 
//   So i do not know if this matters but once the search box is clicked 
//   then the sort is undone and the initial order is shown can be sorted 
//   after search will fix at least look for fixes later if needed

/*
    Notes: potential additions need more info so check later
      so stacked columns for mobile bascialy choose which columsn important
      idk maybe id and status dont implement till then for now ignore jsut touch upon  the
      idea later to see what do and how to handle functionality if needed

      also how to handle links and stuff wat do for now? check later 

      do i need title or just a table?
*/


// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
  }, 200)

  return (
      <span>
          Search:{' '}
          <input
              className="form-control"
              value={value || ""}
              onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
              }}
              placeholder={`${count} records...`}
          />
      </span>
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
      <input
          className="form-control"
          value={filterValue || ''}
          onChange={e => {
              setFilter(e.target.value || undefined)
          }}
          placeholder={`Search ${count} records...`}
      />
  )
}

const DataTable = (props) => {
  // Memos
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(() => props.columns, [props.columns]);
  const defaultColumn = React.useMemo(() => ({
        // Default Filter UI
        Filter: DefaultColumnFilter,
    }),[])


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
      <div className="bg-white -mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg height:100% position:absolute">
      <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            /> 
        <table {...getTableProps()} className="min-w-full min-h-full divide-gray-300">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key= {i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, j) => (
                  // <th key = {j} {...column.getHeaderProps(column.sortable ? column.getSortByToggleProps() : column.render("Header"))} 
                  <th key = {j} {...column.getHeaderProps(column.getSortByToggleProps() )} 
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    <a className="group inline-flex">
                      {column.render("Header")}
                        { (
                        <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">

                          {column.isSorted ? 
                            (column.isSortedDesc ? 
                                (<ChevronDownIcon className='h-5 w-5' aria-hidden='true' />): 
                                (<ChevronDownIcon className='h-5 w-5 rotate-180' aria-hidden='true' />) ): 
                                ""}
                          </span>
                        )}
                    </a>
                    {/* simply use for filtering */}
                    <div>{ (column.canFilter ? column.render('Filter') : null) }</div>
                    {/* <div>{column.filterable && (column.canFilter ? column.render('Filter') : null) }</div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead> 
          <tbody {...getTableBodyProps()}>
            {/* Notes: mapping and using index
             for Stability: the order of the items can change so it can lead to undefined behavior 
             if an item in the middle table is removed could cause table to rerender more items than needed
             ** should not be an issue unless we do real time data which would cause an issue something to look back to if this happens
            
             for component state: if the items are react component with local state then this(indexes using them anyways) could cause for example
             react uses keys to determine whether or not remoount or update 
             if the keys change react could see it as a diff component 
             this could be an issue do to sorting 

             alright so change later to using id of some kind should be fine with input data cause they will id talk to team later 
             about it  
             
             Special thought how does vars affect outside of the {} should be doing anything right? ask someone later or google*/}
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i}{...row.getRowProps()} >
                  {row.cells.map((cell, j) => {
                    return  <td key = {j} className="px-6 py-3.5 text-left font-medium text-gray-900" 
                              {...cell.getCellProps()}>{cell.render("Cell")}
                            </td>;
                  })} 
                </tr>
              );
            })}
          </tbody>
          </table>
            <br />
            <div>Showing the first 20 results of {rows.length} rows</div>
            {/* Notes: figure out why this is not outputting corect info  */}
            {/* <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div> */}
        </div>
  );
};

export default DataTable;
