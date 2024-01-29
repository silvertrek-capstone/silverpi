import Link from 'next/link';

export default function Invoices() {
    const invoices = InvoicesData();
    console.log('test')
    return (
        <>
            <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Invoices</h1>

        </>
    );
}



function InvoicesData() {
    return [
        {
            id: 12,
            title: 'Cement',
            date: '12-13-2003',
            active: 'true',
            context:
                `
            12 yards of cement.
            `
        },
        {
            id: 32,
            title: 'Bricks',
            date: '12-1-2022',
            active: 'true',
            context:
                `
            10 loads of 30 brick loads
            `
        },
        {
            id: 43,
            title: 'Plywood',
            date: '11-30-2000',
            active: 'false',
            context:
                `
            5 truck loads of plywood
            `
        }
    ]
}