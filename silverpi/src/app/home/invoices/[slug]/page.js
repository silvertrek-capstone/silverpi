// app/home/admin/[slug]/page.js
import React from 'react';
import Table from '@/components/table';

// Static Data for demo
// Later, data will be grabbed from API
const invoiceDetails = {
  invoiceNum: '516584',                                                 // Invoice num (might be unique per page, in the URL maybe)
  payStatus: 'Unpaid',                                                  // Pay status 
  createdDate: '12/12/2023',                                            // Job date creation
  dueDate: '1/30/2024',                                                 // payment day span
  termSize: '7 days',                                                   // Terms (time increments)
  tableFields: [
    {
      line: 1,                                                          // Item num in the table
      technician: 'Andrew',                                             // Technician name
      description: 'Glass floor panel installation',                    // task description
      quantity: 7,                                                      // Number of specific tasks requested
      unitPrice: 1000.0,                                                // Price per task
      total: 7000.0                                                     // Total (for the individual task)
    },
    {
      line: 2,
      technician: 'Spencer',
      description: 'Rewiring in Unit C3A of Flanders St. building',
      quantity: 1,
      unitPrice: 1000.0,
      total: 1000.0
    },
    
    // More entries here
  ],
};

const headers = [
  { text: 'Line', value: 'line' },
  { text: 'Technician', value: 'technician' },
  { text: 'Description', value: 'description' },
  { text: 'Quantity', value: 'quantity' },
  { text: 'Unit Price', value: 'unitPrice' },
  { text: 'Total', value: 'total' },
]

const InvoicePage = ({ params }) => {

  // Cost calculation for totals
  let totalDue = 0;
  for (let i = 0; i < invoiceDetails.tableFields.length; i++) {  // For each item within the table, take the total from each job
    totalDue = totalDue + invoiceDetails.tableFields[i].total; // Increment to total
  }
  totalDue = totalDue.toFixed(2);                                // Format to two decimal places for aesthetics

  return (
    <>
      <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Invoice #{params.slug}</h1>

      <div>
        <div className="mb-6">
          <p><span className="font-semibold">Status:</span> {invoiceDetails.payStatus}</p>
          <p><span className="font-semibold">Date Created: </span> {invoiceDetails.createdDate}</p>
          <p><span className="font-semibold">Due Date: </span> {invoiceDetails.dueDate}</p>
          <p><span className="font-semibold">Terms: </span> {invoiceDetails.termSize}</p>
        </div>
        <div className="mb-6 overflow-x-auto">
          <Table
            headers={headers}
            items={invoiceDetails.tableFields}
          >

          </Table>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2">Total Due</h2>
          <p className="text-3xl font-bold">${totalDue}</p>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;        // Assign default export for Next.js to recognize and render component

export async function getStaticPaths() {
  return {
    paths: [], fallback: true,   // Set no paths and fallback to true so any URL will generate the page
  };                             // Note: this will change later once API data is accessible
}
