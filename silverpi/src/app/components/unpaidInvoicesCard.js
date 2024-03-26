import Link from 'next/link'

export default function UnpaidInvCard({ invoice }) {
    // Split the date string into an array of year, month, and day components
    const [year, month, day] = invoice.dueDate.split('-');
    console.log("Invoices:")
    console.log(invoice)
    const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const amount = moneyFormatter.format(invoice.amount)

    return <>
        <div className="rounded-md border-double border border-neutral2 hover:border-secondary mb-2 bg-neutral2 bg-opacity-10">
            <div className="flex px-3 py-2">
                <span className="text-neutral4 font-bold pl-2">{"Invoice#  "}</span>
                <Link href={`/home/invoices/${invoice.invoice}`} className="text-primary font-bold hover:underline pl-1">
                    {invoice.invoice}
                </Link>
                <span className="items-end text-neutral3 text-opacity-50 font-semibold text-xssm italic ml-auto">{`Due Date: ${month}/${day}/${year}`}</span>
            </div>
            <div className="flex flex-row">
                <div className="text-neutral4 font-semibold text-sm pl-5 pb-3">
                    For the completed work orders
                    {
                        invoice.workorders.map((wo, index) => (
                            <span>
                                
                                <Link href={`/home/workorders/${wo}`} className="text-primary font-bold hover:underline pl-1">
                                    #{wo}
                                </Link>
                                {
                                    index < invoice.workorders.length - 1 ? "," : ""
                                }

                            </span>
                        )
                        )}
                </div>
                <span className="ml-auto text-neutral4 font-bold px-3 pb-3"> Total: {amount}</span>
            </div>

        </div>
    </>
}