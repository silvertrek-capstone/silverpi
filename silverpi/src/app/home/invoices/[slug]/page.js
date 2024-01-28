import React from 'react';

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

const InvoicePage = () => {
    
    // Cost calculation for totals
    let totalDue = 0;

    for (let i = 0; i < invoiceDetails.tableFields.length; i++) {  // For each item within the table, take the total from each job
        totalDue = totalDue + invoiceDetails.tableFields[i].total; // Increment to total
    }
    totalDue = totalDue.toFixed(2);                                // Format to two decimal places for aesthetics
    
    return (
      <div className="min-h-screen bg-blue-100 p-8">
        <div className="container mx-auto">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Invoice #{invoiceDetails.invoiceNum}</h1>
            <div className="mb-6">
              <p>Status: <span className="font-semibold">{invoiceDetails.payStatus}</span></p>
              <p>Date Created: {invoiceDetails.createdDate}</p>
              <p>Due Date: {invoiceDetails.dueDate}</p>
              <p>Terms: {invoiceDetails.termSize}</p>
            </div>
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-sm font-medium text-gray-700 bg-blue-200">
                      <th className="px-4 py-2">Line</th>
                      <th className="px-4 py-2">Technician</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Unit Price</th>
                      <th className="px-4 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {invoiceDetails.tableFields.map((item) => (
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">{item.line}</td>
                        <td className="px-4 py-2">{item.technician}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-2">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">Total Due</h2>
                <p className="text-3xl font-bold">${totalDue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default InvoicePage;