// testing the tables_component 
"use client"
import React from 'react';
import DataTable from './table_gen';
const DataTableMemoized = React.memo(DataTable);


/*
    Notes: input data will look like this 
        items: An array of objects, the keys in the objects will match “value” in the given headers. Each object represents a row in the table
        headers: An array of objects, each object representing the header of a column in the table. Each object should contain the following:
        text: The name of the header (what the user sees)
        value: the key to match in the object
        sortable: whether or not the column should be sortable
        disable-search; a boolean value that turns off the search bars for each column, smaller tables will not need search.
*/

const testone = () => {     
     
  const props = {
    columns: [
      {
        Header: 'Column1',
        accessor: 'column1', 
      },
      {
        Header: 'Column2',
        accessor: 'column2',
      },
      {
        Header: 'Column3',
        accessor: 'column3',
      }
    ],
    data: generateDummyData(100)
  };
  
  function generateDummyData(count) {
    const dummyData = [];
    for (let i = 1; i <= count; i++) {
      dummyData.push({
        column1: `data${i}`,
        column2: `data${i}`,
        column3: `data${i}`,
      });
    }
    return dummyData;
  }

//  div stuff
    return (

      <div class="parent h-full bg-gray-300 "> 
            <div class="child h-full bg-blue-500 ">
              <DataTableMemoized {...props} />
            </div> 
        </div> 
    )

};

export default testone;