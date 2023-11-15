"use client"
import React from "react";
import { useTable, useSortBy } from "react-table";

const DataTable = (props) => {
  // Memos
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(() => props.columns, [props.columns]);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    // <div className="px-4 sm:px-6 lg:px-8">
    // <div className="mx-auto max-w-2xl text-center position: relative">
    <div className="bg-white -mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-300">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  <a className="group inline-flex">
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                  </a>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} >
                {row.cells.map((cell) => {
                  return <td className="px-6 py-3.5 text-left font-medium text-gray-900" {...cell.getCellProps()}>{cell.render("Cell")
                  }</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
