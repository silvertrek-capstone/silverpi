//testing file commit 
import React from 'react';
import { useTable, useSortBy } from 'react-table';


const generateTable = (columns, data, styles) => {
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({ columns, data }, useSortBy);


 return (
        <div></div>
    );
};


export default generateTable;