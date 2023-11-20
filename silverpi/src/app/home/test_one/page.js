"use client"
import React from 'react';
import DataTable from './table_gen';

const testone = () => {
    const columns = [
        {
          Header: 'Column1',
          accessor: 'column1',
          sortable: true,
          filterable: true,
        },
        {
          Header: 'Column2',
          accessor: 'column2',
          sortable: true,
          filterable: true,
        },
        {
          Header: 'Column3',
          accessor: 'column3',
          sortable: true,
          filterable: true,
        }
      ]; 
      const data = [
        { column1: "1-2-2023", column2: "john", column3: "cashier" },
        { column1: "1-3-2023", column2: "john21", column3: "cashier3" },
        { column1: "1-4-2023", column2: "john3", column3: "cashier2" },
      ];

     return(
        <div>
            <DataTable columnsInput={columns} dataInput={data}/>
        </div>
     );
}; 

export default testone; 