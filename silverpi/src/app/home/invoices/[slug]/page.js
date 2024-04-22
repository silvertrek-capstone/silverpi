// app/home/admin/[slug]/page.js
import Table from '@/components/table';
import { getSingleInvoice, getbHQATAttachments, getbHQAFAttachments } from '@/api/invoices/getSingleInvoice';

const headers = [
  { text: 'Line', value: 'line' },
  { text: 'Description', value: 'description' },
  { text: 'Amount', value: 'amountString' },
]

export default async function InvoicePage({ params }) {
  const invnum = params.slug;
  const { data, error } = await getSingleInvoice(invnum);
  const invoiceData = data;

  const unique = invoiceData.unique
  const { data: data2, error: error2 } = await getbHQATAttachments(unique);
  const fileID = data2;

  const uniqueAttachmentID = fileID.attachmentID
  const { data: fileData, error: error3 } = await getbHQAFAttachments(uniqueAttachmentID);

  
    
         

  return (
    <>
      <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Invoice #{invoiceData.invoice}</h1>

      

      <div>
        <div className="mb-6">
          <p><span className="font-semibold">Status:</span> {invoiceData.statusStr}</p>
          <p><span className="font-semibold">Date Created: </span> {invoiceData.invoiceDate}</p>
          <p><span className="font-semibold">Due Date: </span> {invoiceData.dueDate}</p>
          <p><span className="font-semibold">Terms: </span> {invoiceData.terms} days</p>
          </div>

        <div className="flex justify-end space-x-4 mb-12">
          <button
            type="button"
            className="rounded bg-indigo-500 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" 
            
          > 
            <a download={`${fileID.origFileName}`} href={`data:${fileData.attachmentFileType};base64,${fileData.attachmentData}`}>View Invoice in PDF</a>
          </button>
        </div>

        <div className='mt-4 mb-8 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg'>
          <Table
            headers={headers}
            items={invoiceData.lines}
          >

          </Table>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="flex flex-col">
          <h2 className="text-l font-bold mb-2 text-right">Total Amount: {invoiceData.totalAmountString}</h2>
          <h2 className="text-l font-semibold mb-2 text-right">Total Paid: {invoiceData.totalPaidString}</h2>
          <p className="text-xl font-bold text-right mt-2">Due: {invoiceData.totalDueString}</p>
        </div>
      </div>
    </>
  );
};


